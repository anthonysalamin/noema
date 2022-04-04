/*
 * 🟢 NOEMA | cookie announcement
 * V.01 | 30.04.2021 @ 08:07 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  cookieAnnouncement();
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.01 | 30.04.2021 @ 08:07 | cookie announcement`
  ); // end logging
}); // end DOM listener

function cookieAnnouncement() {
  // options
  const cookieName = "NOEMA_Cookie_Announcement_04_04_2022",
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
    console.log(`%c warning:`, `color: orange`, `no announcement 🍪 was found`); // end logging
    // display popup after x amount of seconds
    setTimeout(() => {
      cookieWrapper.style.display = "flex";
      $(cookieWrapper).fadeTo(speed, 1, "linear");
      console.log(
        `%c success:`,
        `color: green`,
        `announcement 🍪 popup displayed`
      ); // end logging
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
      console.log(
        `%c success:`,
        `color: green`,
        `announcement 🍪 created and stored`
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
} // end cookieAnnouncement()
