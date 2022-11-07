// document.documentElement.classList.add("debug");

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    document.documentElement.classList.add("debug");
  }
});

document.addEventListener("keyup", () => {
  document.documentElement.classList.remove("debug");
});
