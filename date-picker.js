/*
 * 🟡 NOEMA | date picker V.12
 * dependencies: mobiscroll.js + moment.js
 * build: 28.10.2021 22:13 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  // globals
  const log = console.log,
    version = 12, // script version
    seasonStart = { day: 21, month: 5, year: 2021 },
    seasonEnd = { day: 10, month: 10, year: 2021 },
    seasonHasAnEnd = true,
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

  let date = new Date(),
    today = new Date(date.setDate(date.getDate())),
    min = new Date(
      date.setUTCFullYear(
        seasonStart.year,
        seasonStart.month - 1,
        seasonStart.day
      )
    ),
    max = new Date(
      date.setUTCFullYear(seasonEnd.year, seasonEnd.month - 1, seasonEnd.day)
    );

  let object = {
      // if today's date is more recent than the season's start...
      // ... then use today's date as min value for each day until the season ends
      min: Date.parse(today) > Date.parse(min) ? today : min,
      max: max,
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

  // 🍋 date picker management
  function datePickerInit() {
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
                border: none !important;
              }
              `;

            // inject custom css definition
            function injectStyle(css) {
              const head =
                  document.head || document.getElementsByTagName("head")[0],
                style = document.createElement("style");
              style.type = "text/css";
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
            /*
            // disable SET button if season has ended
            function disableSETbutton() {
              const button = document.querySelector(
                ".mbsc-fr-btn1.mbsc-fr-btn-e.mbsc-fr-btn"
              );
              button.style.pointerEvents = "none";
              button.textContent = "END";
              log(button);
            } // end disableSETbutton()

            setTimeout(() => {
              log(`today: ${Date.parse(today)} seasonend: ${Date.parse(max)}`);
              Date.parse(today) > Date.parse(max) && seasonHasAnEnd
                ? disableSETbutton()
                : log("season not over yet");
            }, 150);
            // end disable SET BUTTON
            */
          } // end if
        },
        false
      ); // end listener
    }); // end for each form
  } // end datePickerInit()

  // init date picker
  datePickerInit();

  // last sync
  const berlin = new Date();
  function addZeroBefore(n) {
    return (n < 10 ? "0" : "") + n;
  }
  function lastSync(day, month, year, hour, minute) {
    log(
      `loaded: date-picker V.${version} | Last sync: ${day}.${month}.${year} @ ${hour}:${minute}`
    );
  }
  lastSync(
    addZeroBefore(berlin.getUTCDate()),
    addZeroBefore(berlin.getUTCMonth() + 1),
    berlin.getUTCFullYear(),
    addZeroBefore(berlin.getUTCHours() + 2),
    addZeroBefore(berlin.getUTCMinutes())
  );
  // end last sync
}); // end DOM listener
