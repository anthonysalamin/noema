/*
 * 🟢 NOEMA | ion range slider
 * V.01 | 08.02.2022 @ 10:26 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  ionRangeSlider();
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.01 | 16.03.2021 @ 19:44 | ion range slider`
  ); // end logging
}); // end DOM listener

function ionRangeSlider() {
  // 🍉 plural management
  function plural(a) {
    return a <= 1 ? `${a} Guest` : `${a} Guests`;
  }

  // 🍑 number of guests
  $("#guests").ionRangeSlider({
    skin: "round",
    min: 1,
    max: 10,
    from: 2,
    force_edges: true,
    prettify: plural,
    // max_postfix: " +",
    onStart: (data) => {
      $(".js-input").prop("value", data.from);
    },
    onChange: (data) => {
      $(".js-input").prop("value", data.from);
    }
  });

  // 🥝 time slots sunset beach
  $("#time").ionRangeSlider({
    skin: "round",
    values: [
      "7:30pm",
      "7:45pm",
      "8:00pm",
      "8:15pm",
      "8:30pm",
      "8:45pm",
      "9:00pm",
      "9:15pm",
      "9:30pm",
      "9:45pm",
      "10:00pm",
      "10:15pm",
      "10:30pm",
      "10:45pm",
      "11:00pm",
      "11:15pm",
      "11:30pm",
      "11:45pm",
      "12:00pm",
      "12:15pm",
      "12:30pm",
      "12:45pm",
      "01:00pm"
    ],
    from: 4,
    force_edges: true,
    prefix: "at ",
    onStart: (data) => {
      $(".js-input").prop("value", data.from);
    },
    onChange: (data) => {
      $(".js-input").prop("value", data.from);
    }
  });
} // end ionRangeSlider()
