/*
 * 🟢 NOEMA | cookie agreement V.01
 * TO DO:
 * 1) ditch jQuery, rebuild animation in vanilla javaScript
 * 2) Rebuild with proper layout in Webflow
 * build: 02.03.2021 17:43 | anthonysalamin.ch
 */
console.log("loaded cookie agreement V.01");
document.addEventListener("DOMContentLoaded", () => {
  // options
  const cookieName = "NOEMA_Cookie_Agreement",
    cookieValue = "Accepted",
    // cookieDomain = "scorpiosmykonos.com",
    popupDelay = 1, // delay in seconds after which the popup appears
    dayStored = 365, // days during which the cookie is stored in user's browser
    speed = 500;

  const log = console.log,
    gdprWrapper = document.getElementById("cookie-wrapper"),
    popupButton = document.getElementById("cookie-accept");

  // 🧠 if no cookie found
  if (!Cookies.get(cookieName)) {
    log("no GDPR 🍪 was found");
    // display popup after x amount of seconds
    setTimeout(() => {
      gdprWrapper.style.display = "flex";
      $(gdprWrapper).fadeTo(speed, 1, "linear");
      log("GDPR 🍪 popup displayed");
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
      log("GDPR 🍪 created and stored");
      Cookies.set(cookieName, cookieValue, {
        expires: date
        // domain: cookieDomain // ⚠️ activate domain for production
      }); // end set cookie
    }); // end listener
  } else {
    log(
      `🍪 ${cookieName} "${cookieValue}" has been found, popup remains hidden.`
    );
  } // end if
}); // end DOMloaded