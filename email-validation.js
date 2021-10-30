/*
 * 🟢 NOEMA | email validation
 * V.2 | 30.08.2021 @ 17:48 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  emailValidation();
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.2 | 30.08.2021 @ 17:48 | email validation`
  ); // end logging
}); // end DOM listener

function emailValidation() {
  // globals
  const log = console.log,
    forms = new Set(document.getElementsByClassName("form-wrapper-rsrv")),
    colorValid = "#23937D",
    colorInvalid = "#DB322D",
    speed = 300;
  let value, arobase, extension, message;

  // 🍉 debounce function definition
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

  // 🍈 check mail
  function emailCheck() {
    Array.from(forms).forEach((form) => {
      const emailInput = form.querySelector("input[name=Email-Address]"),
        checkInput = form.querySelector(".feedback.email");

      function emailValidation() {
        value = emailInput.value;

        // 🥙 checks if arobase is present
        arobase = (() => {
          if (value.indexOf("@") != -1) {
            return true; // thre is an "@"
          } else {
            return false; // thre is no "@"
          }
        })();

        // 🌮 checks if domain + TDL seem correct
        extension = (() => {
          if (arobase) {
            let splitted = value.split("@"),
              localPart = splitted[0], // hello
              domain = splitted[1].split(".")[0], // gmail
              point = splitted[1].indexOf("."), // .
              topDomainLevel = splitted[1].split(".")[1]; // com

            if (
              localPart != "" &&
              domain.length >= 1 &&
              point != -1 &&
              topDomainLevel.length >= 2
            ) {
              return true; // extension seems valid
            } else {
              return false; // extension is not yet valid
            }
          }
        })();

        // 🥗 build warning message
        message = (() => {
          if (value.length >= 1) {
            if (arobase) {
              if (extension) {
                checkInput.style.color = colorValid;
                console.log(`%c success:`, `color: green`, `seems legit`); // end logging
                return ""; // "seems legit"
              } else {
                checkInput.style.color = colorInvalid;
                console.log(`%c warning:`, `color: orange`, `not yet valid`); // end logging
                return "not yet valid";
              } // end if extension
            } else {
              checkInput.style.color = colorInvalid;
              console.log(
                `%c warning:`,
                `color: orange`,
                `seems "@" is missing`
              ); // end logging
              return 'seems "@" is missing';
            } // end if arobase
          } else {
            checkInput.style.color = colorInvalid;
            console.log(`%c error:`, `color: red`, `valid email needed`); // end logging
            return "valid email needed";
          } // end if value > 1
        })();

        checkInput.textContent = message;
      } // end emailValidation
      emailInput.addEventListener("keyup", debounce(emailValidation, speed));
    }); // end for each form
  } // end emailCheck()

  // inits
  emailCheck();
} // end emailValidation()
