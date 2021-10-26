/*
 * 🟢 NOEMA | cookie announcement V.01
 * build: 30.04.2021 08:07 | anthonysalamin.ch
 */
console.log("loaded cookie announcement V.01");
document.addEventListener("DOMContentLoaded", () => {
  // options
  const cookieName = "NOEMA_Cookie_Announcement",
    cookieValue = "Announced",
    // cookieDomain = "scorpiosmykonos.com",
    popupDelay = 1, // delay in seconds after which the popup appears
    dayStored = 365, // days during which the cookie is stored in user's browser
    speed = 500;

  const log = console.log,
    cookieWrapper = document.getElementById("cookie-wrapper-announcement"),
    popupButton = document.getElementById("cookie-accept-announcement");

  // 🧠 if no cookie found
  if (!Cookies.get(cookieName)) {
    log("no announcement 🍪 was found");
    // display popup after x amount of seconds
    setTimeout(() => {
      cookieWrapper.style.display = "flex";
      $(cookieWrapper).fadeTo(speed, 1, "linear");
      log("announcement 🍪 popup displayed");
    }, popupDelay * 1500);

    // close popup on click
    popupButton.addEventListener("click", () => {
      $(cookieWrapper).fadeTo(speed, 0, "linear");
      setTimeout(function () {
        cookieWrapper.style.display = "none";
      }, speed);
    });

    // set date to be equal to x amount of days from current date time in ms
    let date = new Date();
    date.setTime(date.getTime() + dayStored * 24 * 60 * 60 * 1000);

    // 🧠 create cookie on button click to expire on newly defined date

    popupButton.addEventListener("click", () => {
      log("announcement 🍪 created and stored");
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
