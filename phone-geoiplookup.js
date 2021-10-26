/*
 * NOEMA | 🟢 phone geoIpLookup V.6
 * build 16.03.2021 12:44 | anthonysalamin.ch
 */
console.log("loaded phone geoIpLookup V.6");
document.addEventListener("DOMContentLoaded", () => {
  girlGimmeYourNumber();
});

function girlGimmeYourNumber() {
  "use strict";
  // globals
  const log = console.log,
    forms = document.getElementsByClassName("form-wrapper-rsrv"),
    colorValid = "#23937D",
    colorInvalid = "#DB322D",
    token = "1733d2d8ac8982"; // production

  // 🧠 debounce helper function
  function debounce(func, wait) {
    let timeout;
    return () => {
      let context = this; // arguments "func" and "wait"
      let later = () => {
        func.apply(context);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }; // end return
  } // end debounce

  // 🧠 for each form
  Array.from(forms).forEach((form) => {
    const input = form.querySelector(".phone"),
      info = form.querySelector(".feedback.phone");

    // set initial placeholder
    input.placeholder = "Valid phone number";

    // 🧠 initialise intlTelInput
    let iti = intlTelInput(input, {
      allowDropdown: false,
      separateDialCode: false,
      nationalMode: false,
      autoPlaceholder: "polite", // aggressive || polite
      // onlyCountries: [],
      // excludeCountries: [],
      preferredCountries: ["de", "us", "gr", "ch"],
      initialCountry: "auto" // "gr"
      /*
      geoIpLookup: (callback) => {
        fetch(`https://ipinfo.io?token=${token}`)
          .then((response) => response.json()) // parse response
          .then((data) => {
            const countryCode = data && data.country ? data.country : "gr";
            callback(countryCode);
          })
          .catch((err) => {
            log(`Oops, something went wrong: ${err}`);
          });
      }
      */
    });

    // 🧠 function checking phone input
    let checkNumber = function () {
      // heavy lifting stuff here
      let number = iti.getNumber(),
        validity = iti.isValidNumber();

      // 🧠 check if first character is a "+" implying country code is set
      const plusCharacter = (() => {
        if (input.value.charAt(0) == "+") {
          return true;
        } else {
          return false;
        }
      })();

      // 🧠 clean up input of non numerical value except "+"
      (function cleanInput() {
        input.value = number.replace(/[^0-9\+]/g, "");
      })();

      // 🧠 check if number is valid
      if (validity == true) {
        log(`🍀 Yay, your number ${number} seems legit`);
        // input.value = number; // inject full number with national code
        info.innerHTML = ""; // "seems legit"
        info.style.color = colorValid;

        // 🧠 else if number is not valid
      } else {
        log(
          `😡 Oops, your number ${number} seems ${
            validity ? "legit" : "invalid"
          }, please try again.`
        );

        // edge cases if number invalid
        let numberLength = number.length;

        // 🧠 country code is set, perform further check
        if (numberLength > 0 && plusCharacter) {
          if (numberLength < 3) {
            input.placeholder = "";
            setTimeout(function () {
              info.innerHTML = `Valid number needed.`;
            }, 250);
          } else if (numberLength >= 3 && numberLength <= 5) {
            info.innerHTML = `Mmh, not yet valid.`;
          } else if (numberLength > 5) {
            info.innerHTML = `Almost valid.`;
          } else {
            // error handling
            log("not enough info to perform further validation check");
          }
          // 🧠 country code is not set tell the user
        } else if (numberLength > 0 && !plusCharacter) {
          info.innerHTML = `Please enter country code first`;
        } else {
          // error handling
          log("something went wrong with initial country code validation");
        } // end if country code check

        info.style.color = colorInvalid;
      } // end if number is valid
    }; // end checkNumber()

    // 🧠 on input keyup, check number every x milliseconds
    input.addEventListener("keyup", debounce(checkNumber, 20));
  }); // end for each form
} // end girlGimmeYourNumber()