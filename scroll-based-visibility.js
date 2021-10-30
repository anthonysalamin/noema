/*
 * 🟢 NOEMA | scroll based visibility
 * V.02 | 04.03.2021 13:57 | anthonysalamin.ch
 */
document.addEventListener("DOMContentLoaded", () => {
  scrollBasedVisibility();
  console.log(
    `%c loaded:`,
    `color: green`,
    `V.02 | 04.03.2021 13:57 | scroll based visibility`
  ); // end logging
}); // end DOM listener

function scrollBasedVisibility() {
  // listening to scroll
  document.addEventListener("scroll", () => {
    // globals
    const log = console.log,
      logo = document.getElementById("logo"),
      trigger = document.getElementById("trigger"),
      // feedback = document.getElementById("feedback"),
      // feedbackTriggerPosition = document.getElementById("trigger-position"),
      // feedbackScrollBarPosition = document.getElementById("scrollbar-position"),
      scrollBar = document.scrollingElement,
      viewportHeight = window.innerHeight;
    let isAboveTrigger = true,
      triggerPosition = Math.ceil(trigger.offsetTop),
      scrollBarPosition = Math.ceil(scrollBar.scrollTop);

    // debug
    // log(`trigger position: ${triggerPosition}px`);
    // feedbackTriggerPosition.textContent = `trigger position: ${triggerPosition}px`;
    // log(`scrollbar position: ${scrollBarPosition}px`);
    // feedbackScrollBarPosition.textContent = `scrollbar position: ${scrollBarPosition}px`;

    // logic
    isAboveTrigger = (() => {
      if (scrollBarPosition > triggerPosition - viewportHeight / 2) {
        // log("logo should be invisible");
        // feedback.textContent = "is bellow trigger top position";
        return false;
      } else {
        // feedback.textContent = "is above trigger top position";
        return true;
      } // end if
    })();

    // animation
    logo.style.opacity = isAboveTrigger ? "1" : "0";
  }); // end scroll event
} // end scrollBasedVisibility()
