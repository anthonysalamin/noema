/*
 * 🟢 NOEMA | button reserve handling V.01
 * Behaviour: on click change text content + bg color based on device's width
 * build: 15.03.2021 11:08 | anthonysalamin.ch
 */
console.log("loaded button reserve handling V.01");
document.addEventListener("DOMContentLoaded", () => {
  // globals
  const log = console.log,
    btnReserve = document.getElementById("btn-reserve"),
    deviceLimit = 479; // 479px ≈ max-width mobile (webflow)
  let textContent = "RESERVE",
    width,
    desktopDevice;

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
    log(width);
    log(desktopDevice);
  } // end deviceSize()
  // ideally should run the function on window resize event with debounce function
  deviceSize();

  // logic
  btnReserve.addEventListener("click", () => {
    textContent = btnReserve.textContent;
    log(textContent);
    if (textContent == "RESERVE") {
      btnReserve.textContent = "CLOSE";
      btnReserve.style.backgroundColor = desktopDevice
        ? "#eeeadf"
        : "transparent";
    } else if (textContent == "CLOSE") {
      btnReserve.textContent = "RESERVE";
      btnReserve.style.backgroundColor = "transparent";
    } else {
      log("Oops, something went wrong with btn reserv handling");
    } // end if
  }); // end click listener
}); // end DOM loaded
