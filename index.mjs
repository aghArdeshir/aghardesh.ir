import { songs } from "./songs/songs.mjs";

const song = [
  songs.aghArdeshir.badAzBad,
  songs.nishkhand.sarbasteyeYekSarbaz,
][0];

fetch(song.lyricsUrl)
  .then((res) => res.json())
  .then((lyrics) => {
    // document.getElementsByClassName("cover-art")[0].src = song.coverUrl;
    // document.querySelector(".title-persian").textContent = song.title;
    // document.querySelector(".artist-persian").textContent = song.artist;
    // document.body.style.backgroundColor = song.bgColor;
    // document.body.style.color = song.textColor;
    // const animationDuration = 0.3;
    // const cssTransition = `all ${animationDuration}s ease-out`;
    // const cssTop = "10px";
    // const cssFontSize = "18px";
    // const cssSmallFontSize = "0px";
    // const lyricsDom = document.getElementById("lyrics");
    // const lyricsBackupDom = document.getElementById("lyrics-backup");
    // let lyricsText = "";
    // let lyricsBackupText = "";
    // function setLyricsText(text = "") {
    //   if (lyricsText !== text) {
    //     lyricsText = text || "";
    //     lyricsDom.style.transition = "";
    //     lyricsDom.style.top = "90px";
    //     lyricsDom.style.fontSize = cssSmallFontSize;
    //     lyricsDom.style.opacity = "0.5";
    //     lyricsDom.innerHTML = lyricsText;
    //     setTimeout(() => {
    //       lyricsDom.style.transition = cssTransition;
    //       lyricsDom.style.top = cssTop;
    //       lyricsDom.style.fontSize = cssFontSize;
    //       lyricsDom.style.opacity = "1";
    //     }, animationDuration * 1000);
    //   }
    // }
    // function setLyricsBackupText(text = "") {
    //   if (lyricsBackupText !== text) {
    //     lyricsBackupText = text || "";
    //     lyricsBackupDom.style.transition = "";
    //     lyricsBackupDom.style.top = "50px";
    //     lyricsBackupDom.style.fontSize = cssFontSize;
    //     lyricsBackupDom.style.opacity = "1";
    //     lyricsBackupDom.innerHTML = lyricsBackupText;
    //     setTimeout(() => {
    //       lyricsBackupDom.style.transition = cssTransition;
    //       lyricsBackupDom.style.top = cssTop;
    //       lyricsBackupDom.style.fontSize = cssSmallFontSize;
    //       lyricsBackupDom.style.opacity = "0.5";
    //     }, animationDuration * 1000);
    //   }
    // }
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
    });
    wavesurfer.load(song.songUrl);

    setTimeout(() => {
      wavesurfer.play();

      lyrics.forEach((t, i) => {
        const p = document.createElement("p");
        if (i < lyrics.length - 1) {
          const height = t.time - lyrics[i + 1].time;
          p.innerHTML = (t.text || "") + parseFloat(height.toFixed(2));
          p.style.height = height * 10 * -1 + "px";
        }
        document.getElementById("root").children[0].appendChild(p);
      });

      const length = Math.floor(wavesurfer.backend.scheduledPause * 10);
      let height = parseInt(
        getComputedStyle(document.getElementById("root").children[0]).height
      );
      height = 800;

      wavesurfer.on("audioprocess", function (currentTime) {
        const current = Math.floor(currentTime * 10);
        // console.log(length, height, current);
        document
          .getElementById("root")
          .scrollTo(0, Math.floor((current / length) * height));
        // console.log(currentTime);
        // const index =
        //   lyrics.findIndex(
        //     (member) => member.time - animationDuration >= currentTime
        //   ) - 1;
        // if (index < 0) {
        //   lyricsDom.innerHTML = "";
        //   return;
        // }
        // if (index === 0 && lyrics[index].time - animationDuration > currentTime) {
        //   lyricsDom.innerHTML = "";
        //   return;
        // }
        // setLyricsText(lyrics[index].text);
        // if (lyrics[index - 1]) {
        //   setLyricsBackupText(lyrics[index - 1].text);
        // }
      });
    }, 2000);
  });
