/*
 * 🟢 NOEMA | button reserve handling
 * Behaviour: on click change text content + bg color based on device's width
 * V.01 | 29.03.2022 @ 13:22 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  buttonHandling();
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.01 | 15.03.2021 @ 11:08 | button reserve handling`
  ); // end logging
}); // end DOM listener

function buttonHandling() {
  // globals
  const log = console.log,
    btnReserve = document.getElementById("btn-reserve"),
    deviceLimit = 479; // 479px ≈ max-width mobile (webflow)
  let textContent = "RESERVE",
    width,
    desktopDevice;
  
  if (btnReserve == null) return; // sevenrooms custom id button used instead

  // 🍐 check device's size on window resize
  function deviceSize() {
    desktopDevice = (() => {
      width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width >= deviceLimit) {
        return true;
      } else {
        return false;
      } // end if
    })(); // end device variable
    // checks
    // log(width);
    // log(desktopDevice);
  } // end deviceSize()
  // ideally should run the function on window resize event with debounce function
  deviceSize();

  // logic
  btnReserve.addEventListener("click", () => {
    textContent = btnReserve.textContent;
    // log(textContent);
    if (textContent == "RESERVE") {
      btnReserve.textContent = "CLOSE";
      btnReserve.style.backgroundColor = desktopDevice
        ? "#eeeadf"
        : "transparent";
    } else if (textContent == "CLOSE") {
      btnReserve.textContent = "RESERVE";
      btnReserve.style.backgroundColor = "transparent";
    } else {
      log("Oops, something went wrong with the button reserve handling");
    } // end if
  }); // end click listener
} // end buttonHandling()
