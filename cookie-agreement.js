/*
 * 🟢 NOEMA | cookie agreement
 * TO DO:
 * 1) ditch jQuery, rebuild animation in vanilla javaScript
 * 2) Rebuild with proper layout in Webflow
 * V.01 | 02.03.2021 @ 17:43 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  cookieAgreement();
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.01 | 02.03.2021 @ 17:43 | cookie agreement`
  ); // end logging
}); // end DOM listener

function cookieAgreement() {
  // options
  const cookieName = "NOEMA_COOKIE_AGREEMENT",
    cookieValue = "ACCEPTED",
    // cookieDomain = "scorpiosmykonos.com",
    popupDelay = 1, // delay in seconds after which the popup appears
    dayStored = 365, // days during which the cookie is stored in user's browser
    speed = 500;

  const log = console.log,
    gdprWrapper = document.getElementById("cookie-wrapper"),
    popupButton = document.getElementById("cookie-accept");

  // 🧠 if no cookie found
  if (!Cookies.get(cookieName)) {
    console.log(`%c warning:`, `color: orange`, `no agreement 🍪 was found`); // end logging
    // display popup after x amount of seconds
    setTimeout(() => {
      gdprWrapper.style.display = "flex";
      $(gdprWrapper).fadeTo(speed, 1, "linear");
      console.log(
        `%c success:`,
        `color: green`,
        `agreement 🍪 popup displayed`
      ); // end logging
    }, popupDelay * 1500);

    // close popup on click
    popupButton.addEventListener("click", () => {
      $(gdprWrapper).fadeTo(speed, 0, "linear");
      setTimeout(function () {
        gdprWrapper.style.display = "none";
      }, speed);
    });

    // set date to be equal to x amount of days from current date time in ms
    let date = new Date();
    date.setTime(date.getTime() + dayStored * 24 * 60 * 60 * 1000);

    // 🧠 create cookie on button click to expire on newly defined date

    popupButton.addEventListener("click", () => {
      console.log(
        `%c success:`,
        `color: green`,
        `agreement 🍪 created and stored`
      ); // end logging
      Cookies.set(cookieName, cookieValue, {
        expires: date
        // domain: cookieDomain // ⚠️ activate domain for production
      }); // end set cookie
    }); // end listener
  } else {
    console.log(
      `%c success:`,
      `color: green`,
      `${cookieName} 🍪 is "${cookieValue}", popup remains hidden`
    ); // end logging
  } // end if
} // end cookieAgreement()
