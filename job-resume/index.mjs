function doDefaultTheme() {
  undoDarkTheme();
  takeBrushFromTheChild();
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

window.onload = () => {
  document.addEventListener("colorschemechange", (event) => {
    if (event.detail.colorScheme === "dark") {
      doDarkTheme();
    } else {
      doDefaultTheme();
    }
  });
};
