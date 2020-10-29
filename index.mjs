import lyricsTimes from "./songs/aghArdeshir - Ba'd Az Bad/lyrics.mjs";

document.getElementsByClassName("cover-art")[0].src =
  "songs/aghArdeshir - Ba'd Az Bad/ba'd-az-bad.original.1800x1800.png";

const cssTransition = "all 0.4s ease-out";
const cssTop = "-20px";
const cssFontSize = "18px";
const cssSmallFontSize = "0px";

const lyricsDom = document.getElementById("lyrics");
const lyricsBackupDom = document.getElementById("lyrics-backup");

var wavesurfer = WaveSurfer.create({
  container: "#waveform",
});

let lyricsText = "";
let lyricsBackupText = "";

function setLyricsText(text = "") {
  if (lyricsText !== text) {
    lyricsText = text || "";

    lyricsDom.style.transition = "";
    lyricsDom.style.top = "70px";
    lyricsDom.style.fontSize = cssSmallFontSize;
    lyricsDom.style.opacity = "0.5";

    lyricsDom.innerHTML = lyricsText;

    setTimeout(() => {
      lyricsDom.style.transition = cssTransition;
      lyricsDom.style.top = cssTop;
      lyricsDom.style.fontSize = cssFontSize;
      lyricsDom.style.opacity = "1";
    }, 400);
  }
}

function setLyricsBackupText(text = "") {
  if (lyricsBackupText !== text) {
    lyricsBackupText = text || "";

    lyricsBackupDom.style.transition = "";
    lyricsBackupDom.style.top = "20px";
    lyricsBackupDom.style.fontSize = cssFontSize;
    lyricsBackupDom.style.opacity = "1";

    lyricsBackupDom.innerHTML = lyricsBackupText;

    setTimeout(() => {
      lyricsBackupDom.style.transition = cssTransition;
      lyricsBackupDom.style.top = cssTop;
      lyricsBackupDom.style.fontSize = cssSmallFontSize;
      lyricsBackupDom.style.opacity = "0.5";
    }, 400);
  }
}

wavesurfer.load(
  "songs/aghArdeshir - Ba'd Az Bad/aghArdeshir - Ba'd Az Bad.mp3"
);
wavesurfer.on("audioprocess", function (currentTime) {
  const index =
    lyricsTimes.findIndex((member) => member.time - 0.4 >= currentTime) - 1;

  if (index < 0) {
    lyricsDom.innerHTML = "";
    return;
  }

  if (index === 0 && lyricsTimes[index].time - 0.4 > currentTime) {
    lyricsDom.innerHTML = "";
    return;
  }

  setLyricsText(lyricsTimes[index].text);
  if (lyricsTimes[index - 1]) {
    setLyricsBackupText(lyricsTimes[index - 1].text);
  }
});

setTimeout(() => {
  wavesurfer.play();
}, 1000);
