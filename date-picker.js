/*
 * 🟡 NOEMA | date picker
 * dependencies: mobiscroll.js + moment.js
 * V.12 | 08.02.2022 @ 10:23 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  datePicker();
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.12 | 28.10.2021 @ 23:13 | date picker`
  ); // end logging
}); // end DOM listener

//date picker management
function datePicker() {
  // options
  const seasonHasAnEnd = true,
    seasonStart = { day: 6, month: 5, year: 2022 },
    seasonEnd = { day: 10, month: 10, year: 2022 },
    daysLimit = 30;

  // globals
  const log = console.log,
    forms = document.getElementsByClassName("form-wrapper-rsrv"),
    monthIds = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

  const date = new Date(),
    today = new Date(date.setDate(date.getDate())),
    future = new Date(date.setDate(date.getDate() + daysLimit)); // x days in the future

  const min = new Date(
    date.setUTCFullYear(
      seasonStart.year,
      seasonStart.month - 1,
      seasonStart.day
    )
  );

  const max = new Date(
    date.setUTCFullYear(seasonEnd.year, seasonEnd.month - 1, seasonEnd.day)
  );

  let object = {
      // if today's date is more recent than the season's start...
      // ... then use today's date as min value for each day until the season ends
      min: Date.parse(today) > Date.parse(min) ? today : min,
      max: seasonHasAnEnd ? max : future,
      dateFormat: "dd/mm/yyyy",
      display: "center",
      layout: "layout",
      showOnTap: false,
      showOnFocus: false
    },
    settings = {
      theme: "ios",
      themeVariant: "light",
      calendarSystem: "gregorian"
    };

  Array.from(forms).forEach((form) => {
    const calendar = form.querySelector(".mobiscroll-calendar"),
      button = form.querySelector(".mobiscroll-button");

    // 🍇 settings + instance
    mobiscroll.settings = settings;
    const instance = mobiscroll.calendar(calendar, object);

    // 🍍 on click trigger date picker
    calendar.addEventListener(
      "click",
      () => {
        if (Date.parse(today) > Date.parse(max) && seasonHasAnEnd) {
          // define input disabled css
          const inputDisabledStyle = `
              input:disabled {
                background-color: transparent !important;
                border-top: none !important;
                border-left: none !important;
                border-right: none !important;
                border-bottom: 1px solid black !important;
              }
              input::placeholder {
                color: red;
                opacity: 1; /* Firefox */
              }
              `;

          // inject custom css definition
          function injectStyle(css) {
            const head =
                document.head || document.getElementsByTagName("head")[0],
              style = document.createElement("style");
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);
          }
          // inject custom css expression
          injectStyle(inputDisabledStyle);

          // update placeholder and disable input
          calendar.placeholder = "Season has ended.";
          calendar.disabled = true;
          calendar.style.cursor = "not-allowed";
        } else {
          // show calendar
          instance.show();
        } // end if
      },
      false
    ); // end listener

  }); // end for each form
} // end datePicker()
