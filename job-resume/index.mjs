import { colors } from "./colors.mjs";

function doDefaultTheme() {
  undoDarkTheme();
  takeBrushFromTheChild();
}

function giveBrushToTheChild() {
  doDefaultTheme();

  document.body.classList.add("child-brush");

  document.querySelector(
    ".overview-section"
  ).style.backgroundImage = `linear-gradient(${colors[1]}, ${colors[2]})`;

  for (let i = 1; i < 5; i++) {
    document.querySelectorAll("section")[
      i
    ].style.backgroundImage = `linear-gradient(to right, ${colors[i - 1]}, ${
      colors[i]
    })`;
  }
}

function doDarkTheme() {
  doDefaultTheme();
  document.body.classList.add("dark-theme");
}

function takeBrushFromTheChild() {
  document.body.classList.remove("child-brush");

  document.querySelector(".overview-section").style.backgroundImage = `unset`;

  for (let i = 1; i < 5; i++) {
    document.querySelectorAll("section")[i].style.backgroundImage = `unset`;
  }
}

function undoDarkTheme() {
  document.body.classList.remove("dark-theme");
}

window.doDefaultTheme = doDefaultTheme;
window.doDarkTheme = doDarkTheme;
window.giveBrushToTheChild = giveBrushToTheChild;

window.onload = () => {
  document.addEventListener("colorschemechange", (event) => {
    if (event.detail.colorScheme === "dark") {
      doDarkTheme();
    } else {
      doDefaultTheme();
    }
  });
};
