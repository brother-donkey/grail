// document.documentElement.classList.add("debug");

const atlasJs = require("@microsoft/atlas-js");
atlasJs.initPopover();

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    document.documentElement.classList.add("debug");
  }
});

document.addEventListener("keyup", () => {
  document.documentElement.classList.remove("debug");
});

const burger = document.querySelector(".burger");
burger.onclick = () => {
  burger.classList.toggle("burger-expanded");
};
