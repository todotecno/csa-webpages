/* ✧ LIQUID MOUSE LIGHT EFFECT ✧ */

document.addEventListener("mousemove", (event) => {
  document.body.style.setProperty(
    "--mouse-x",
    event.clientX + "px"
  );

  document.body.style.setProperty(
    "--mouse-y",
    event.clientY + "px"
  );

  document.body.classList.add("mouse-active");
});

document.addEventListener("mouseleave", () => {
  document.body.classList.remove("mouse-active");
});