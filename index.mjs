import { songs } from "./songs/songs.mjs";
const song = songs.nishkhand.sarbasteyeYekSarbaz;

document.getElementsByClassName("cover-art")[0].src = song.coverUrl;
document.body.style.backgroundColor = song.bgColor;
document.body.style.color = song.textColor;
document.querySelector(".title-persian").textContent = song.title;
document.querySelector(".artist-persian").textContent = song.artist;

const cssTransition = "all 0.4s ease-out";
const cssTop = "0px";
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
    lyricsDom.style.top = "90px";
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
    lyricsBackupDom.style.top = "40px";
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

wavesurfer.load(song.songUrl);
wavesurfer.on("audioprocess", function (currentTime) {
  const index =
    song.lyrics.findIndex((member) => member.time - 0.4 >= currentTime) - 1;

  if (index < 0) {
    lyricsDom.innerHTML = "";
    return;
  }

  if (index === 0 && song.lyrics[index].time - 0.4 > currentTime) {
    lyricsDom.innerHTML = "";
    return;
  }

  setLyricsText(song.lyrics[index].text);
  if (song.lyrics[index - 1]) {
    setLyricsBackupText(song.lyrics[index - 1].text);
  }
});

setTimeout(() => {
  wavesurfer.play();
}, 5000);
