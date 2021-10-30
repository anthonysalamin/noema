/*
 * 🟡 NOEMA | AJAX reservation + invisible recaptcha (V2)
 * V.07 | 26.10.2021 @ 21:58 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.07 | 26.10.2021 @ 21:58 | AJAX reservation + invisible recaptcha (V2)`
  ); // end logging
}); // end DOM listener


const log = console.log,
  submitFeedback = document.getElementById("submit-feedback"),
  submitBtn = document.getElementById("submit");

function onSubmit(token) {
  return new Promise(function (resolve, reject) {
    const response = grecaptcha.getResponse();
    log(`onSubmit response: ${response}`);
    log(`response.success: ${response.success}`); // should display "true"
    log(`response.hostname: ${response.hostname}`); // should display "noemamykonos.com"
    /*
    {
      "success": true|false,
      "challenge_ts": timestamp, 
      "hostname": string,
      "error-codes": [...]
    }
    */
    if (grecaptcha === undefined) {
      log("oops, recaptcha not defined");
      reject();
    }

    if (!response) {
      log("Coud not get recaptcha response, abort");
      submitFeedback.textContent = "Recaptcha response error";
      reject();
    } else if (response) {
      log("about to run ajax function to send form to formbackend");
      submitFeedback.textContent = "Sending details...";
      ajaxMe();
    } else {
      log("Oops, something went wrong with the response");
      submitFeedback.textContent = "Something went wrong with recaptcha.";
    }
    grecaptcha.reset();
    log("recaptcha got reset");
    submitFeedback.textContent = "recaptcha got reset";
  }); //end promise
} // end onSubmit

function validate(event) {
  event.preventDefault();
  submitFeedback.textContent = "Verifying informations...";

  // month injection for orestis
  function monthInjection() {
    // scoped
    const inputDate = document.getElementsByName("Date")[0],
      inputMonth = document.getElementsByName("month")[0];
    let monthNumber, monthName;
    // check if date is set, update hidden month accordingly
    if (inputDate.value) {
      monthNumber = Number(inputDate.value.split("/")[1]);
      // define which month it is + inject its name into hidden field
      switch (monthNumber) {
        case 01:
          inputMonth.value = "January";
          break;
        case 02:
          inputMonth.value = "February";
          break;
        case 03:
          inputMonth.value = "March";
          break;
        case 04:
          inputMonth.value = "April";
          break;
        case 05:
          inputMonth.value = "May";
          break;
        case 06:
          inputMonth.value = "June";
          break;
        case 07:
          inputMonth.value = "July";
          break;
        case 08:
          inputMonth.value = "August";
          break;
        case 09:
          inputMonth.value = "September";
          break;
        case 10:
          inputMonth.value = "October";
          break;
        case 11:
          inputMonth.value = "November";
          break;
        case 12:
          inputMonth.value = "December";
          break;
        default:
          console.log("something went wrong with month injection");
      } // end switch
    } else {
      inputMonth.value = "no date specified";
    } // end if
  } // end monthInjection()
  monthInjection();

  // globals
  const log = console.log,
    form = document.getElementById("noema-reservation"),
    alertWrapper = document.querySelector("#error-container-message"),
    alertWrap = alertWrapper.querySelector("#error-wrapper-message"),
    alertSpan = alertWrap.querySelector("#error-text-message"),
    speed = 250;

  const inputs = new Set(form.getElementsByTagName("input")),
    submit = form.querySelector("#submit");

  let requiredInputs = [],
    emptyInputs = [],
    inputNames = [],
    requiredFilledInputs;

  // push all required fields into array
  inputs.forEach((input) => {
    if (input.required == true) {
      requiredInputs.push(input);
    }
  });

  // perform input management
  function inputsManagement() {
    // creates a new array "requiredFilledInputs" with only required input not empty
    requiredFilledInputs = requiredInputs.filter((input) => {
      if (input.value.length > 0) {
        return input;
      } // end if
    }); // end filter

    // create array with empty required inputs
    emptyInputs = requiredInputs.filter((input) => {
      if (input.value.length == 0) {
        return input;
      } // end if
    }); // end filter

    // populates "inputNames" array with the names of each filled required inputs
    inputNames = emptyInputs.map((input) => {
      return input.name;
    });

    // debug only
    log(`required inputs: ${requiredInputs.length}`);
    log(`required filled inputs: ${requiredFilledInputs.length}`);
    log(`required empty inputs: ${emptyInputs.length}`);
  } // end inputsManagement

  (function checkMePlease() {
    inputsManagement();
    if (requiredInputs.length == requiredFilledInputs.length) {
      log("Yay, all required fields filled, sending form");
      submitFeedback.textContent = "All fields validated";
      // run AJAX function, repectively run captcha verification
      grecaptcha.execute();
    } else {
      // there are fields missing
      const message = inputNames.toString().replace(/,/g, ", "),
        plural = emptyInputs.length > 1 ? "s" : "";

      // inject warning message
      alertSpan.textContent = `Almost there. Please fill in the required field${plural}: ${message}`;

      // animations
      alertWrapper.style.opacity = "0";
      alertWrapper.style.display = "flex";
      $(alertWrapper).animate(
        {
          opacity: "1"
        },
        speed
      );
      alertWrap.style.opacity = "0";
      $(alertWrap).delay("fast").animate(
        {
          opacity: "1"
        },
        speed
      );

      // inject warning placeholders
      emptyInputs.forEach((input) => {
        log(`${input.name} input is missing`);
        setTimeout(function () {
          submitFeedback.textContent = "Make sure to fill in all fields.";
        }, 500);

        // utility function to capitalize first letter of a string
        const capitalizeFirstLetter = ([first, ...rest], locale = "en") =>
          first.toLocaleUpperCase(locale) + rest.join("");

        input.placeholder = `${capitalizeFirstLetter(input.name)} is required`;
        input.classList.add("warning-color");
      });
    } // end of if statement
  })(); // end checkMePlease()
} // end validate()

function onload() {
  submitBtn.onclick = validate;
  // log("onload says: listening to submit event");
} // end onload()
onload();

function ajaxMe() {
  // scoped
  const log = console.log,
    form = document.getElementById("noema-reservation"),
    processor = "https://www.formbackend.com/f/",
    id = "220114adb2cf233c", // PRODUCTION_KEY
    production = true, // ⚠️ is the script production ready ? ⚠️
    development = "xxx.webflow.io", // to define
    launch = "noemamykonos.com",
    redirect = false, // redirect user to thank you page ?
    subpage = "thanks",
    delay = 10;

  // check if production or development environment
  let domain = production ? launch : development;

  const formData = new FormData(form),
    request = new XMLHttpRequest(),
    method = "POST",
    action = `${processor}${id}`,
    async = "true";

  // 🍀 on success
  function success() {
    log(`readyState: ${request.readyState}, status: ${request.status}`);
    const response = JSON.parse(request.response),
      name = response.values.Name;
    log(`server response: thank you ${name} !`);
    document.getElementById("noema-reservation").style.display = "none";
    // document.getElementById("user").textContent = `${name}`;
    document.getElementById("form-success").style.display = "block";
    // if redirect is true, open new thank you page
    if (redirect) {
      setTimeout(() => {
        // window.location.href = `https://www.${domain}/${subpage}?name=${name}`;
        window.open(`https://${domain}/${subpage}?name=${name}`, "_self");
      }, delay);
    } else {
      log("no redirect to thank you page");
    } // end if
  } // end success()

  // 😡 on error
  function error(err) {
    alert(`Oops, something went wrong: ${err}`);
    log(`Oops, something went wrong: ${err}`);
    submitFeedback.textContent = `Oops, something went wrong: ${err}`;
  } // end error()

  request.onload = success;
  request.onerror = error;
  request.open(method, action, async);
  request.setRequestHeader("Accept", "application/json; charset=utf-8");
  request.send(formData);
} // end ajaxMe()
