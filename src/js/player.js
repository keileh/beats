const playBtn = document.querySelector(".player__btn");
const playerPlayBtn = document.querySelector(".player__playback-button");
const video = document.getElementById("videoplayer");
const durationControl = document.getElementById("playbackLevel");
const volumeControl = document.getElementById("volumeLevel");
const volumeBtn = document.querySelector(".player__volume-button");
const dynamicBtn = document.querySelector(".volume__button-icon");
const playButtons = document.querySelectorAll(".play");
let intervalId;
let soundLevel;

window.addEventListener('load', () => {
    video.addEventListener('click', playStop);

    for (let i = 0; i < playButtons.length; i++)  {
        playButtons[i].addEventListener('click', playStop);
    }

    durationControl.min = 0;
    durationControl.value = 0;
    durationControl.max = video.duration;
    durationControl.addEventListener('input', setVideoDuration);

    volumeControl.min = 0;
    volumeControl.max = 10;
    volumeControl.value = volumeControl.max;
    volumeControl.addEventListener('input', changeVolumeLevel);

    dynamicBtn.addEventListener('click', volumeOff);

    video.addEventListener('ended', () => {
        playBtn.classList.toggle('player__btn--active');
        playerPlayBtn.classList.toggle('active');
        video.currentTime = 0;
    });
});

function playStop() {
    playBtn.classList.toggle('player__btn--active');
    playerPlayBtn.classList.toggle('active');
    if (video.paused) {
        video.play();
        intervalId = setInterval(updateDuration, 1000 / 60);
    } else {
        clearInterval(intervalId);
        video.pause();
    }
};

function setVideoDuration() {
    video.currentTime = durationControl.value;
    updateDuration();
};

function updateDuration() {
    durationControl.value = video.currentTime;
    const step = video.duration / 100;
    const percent = video.currentTime / step;
    durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${percent}%, #333 ${percent}%)`;

};

function changeVolumeLevel() {
    video.volume = volumeControl.value / 10;
    if (video.volume === 0) {
        volumeBtn.classList.add('active');
    } else {
        volumeBtn.classList.remove('active');
    }
}

function volumeOff() {
    if (video.volume === 0) {
        video.volume = soundLevel;
        volumeControl.value = soundLevel * 10;
        volumeBtn.classList.remove('active');
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        volumeControl.value = 0;
        volumeBtn.classList.add('active');
    }
};


// let player;
// const playerContainer = $(".player");   
// const playerVolumeButton = $(".player__volume-button");
// const playerVolumeContainer = $(".player__volume");
// const playerVolumeRegulator = $(".player__regulator");

// playerVolumeButton.click(e => {
//     e.preventDefault();

//     const currentVolume = player.getVolume();

//     if (playerVolumeContainer.hasClass("muted")) {
//         player.unMute();
//         playerVolumeContainer.removeClass("muted");
//     } else {
//         player.mute();
//         playerVolumeContainer.addClass("muted");
//     };
    
// });

// playerVolumeRegulator.click(e => {
//     const volumeBar = $(e.currentTarget);
//     const clickedPositionOnVolumeBar = e.originalEvent.layerX;
//     const newVolumeButtonPositionPercent = (clickedPositionOnVolumeBar / volumeBar.width()) * 100;
//     const changeVolume = player.getVolume() * newVolumeButtonPositionPercent;

//     $(".player__regulator-button").css ({
//         left: `${newVolumeButtonPositionPercent}%`
//     })

//     player.setVolume(changeVolume);
// });

// const onPlayerReady = () => {
//     let interval;
//     const durationSec = player.getDuration(); 

//     interval = setInterval(() => {
//         const completedSec = player.getCurrentTime();
//         const completedPercent = (completedSec / durationSec) * 100;

//         $(".player__playback-button").css ({
//             left: `${completedPercent}%`
//         });
//     });
// }

// let eventsInit = () => {
//     $(".player__start").click(e => {
//         e.preventDefault();

//         if (playerContainer.hasClass("paused")) {
//             player.pausedVideo();
//         } else {
//             player.playVideo();
//         }
//     })

//     $(".player__playback").click(e => {
//         const bar = $(e.currentTarget);
//         const clickedPosition = e.originalEvent.layerX;
//         const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//         const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

//         $(".player__playback-button").css ({
//             left: `${newButtonPositionPercent}%`
//         });

//         player.seekTo(newPlaybackPositionSec);
//     })

//     $(".player__splash").click(e => {
//         player.playVideo();
//     })
// };

// const onPlayerStateChange = event => {
//     switch (event.data) {
//         case 1:
//             playerContainer.addClass("active");
//             playerContainer.removeClass("paused");
//             break;

//         case 2: 
//             playerContainer.removeClass("active");
//             playerContainer.addClass("paused");
//             break;
//     }
// };

// function onYouTubeIframeAPIReady() {
//     player = new YT.Player("yt-player", {
//         height: '427',
//         width: '662',
//         videoId: '57XtvRwMleI',
//         events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//         },
//         playerVars: {
//             controls: 0,
//             disablekb: 0,
//             showInfo: 0,
//             rel: 0,
//             autoplay: 0,
//             modestbranding: 0
//         }
//     });
// }

// eventsInit();