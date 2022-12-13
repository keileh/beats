let player;
const playerContainer = $(".player");   
const playerVolumeButton = $(".player__volume-button");
const playerVolumeContainer = $(".player__volume");
const playerVolumeRegulator = $(".player__regulator");

playerVolumeButton.click(e => {
    e.preventDefault();

    const currentVolume = player.getVolume();

    if (playerVolumeContainer.hasClass("muted")) {
        player.unMute();
        playerVolumeContainer.removeClass("muted");
    } else {
        player.mute();
        playerVolumeContainer.addClass("muted");
    };
    
});

playerVolumeRegulator.click(e => {
    const volumeBar = $(e.currentTarget);
    const clickedPositionOnVolumeBar = e.originalEvent.layerX;
    const newVolumeButtonPositionPercent = (clickedPositionOnVolumeBar / volumeBar.width()) * 100;
    const changeVolume = player.getVolume() * newVolumeButtonPositionPercent;

    $(".player__regulator-button").css ({
        left: `${newVolumeButtonPositionPercent}%`
    })

    player.setVolume(changeVolume);
});

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration(); 

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css ({
            left: `${completedPercent}%`
        });
    });
}

let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        if (playerContainer.hasClass("paused")) {
            player.pausedVideo();
        } else {
            player.playVideo();
        }
    })

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css ({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);
    })

    $(".player__splash").click(e => {
        player.playVideo();
    })
};

const onPlayerStateChange = event => {
    switch (event.data) {
        case 1:
            playerContainer.addClass("active");
            playerContainer.removeClass("paused");
            break;

        case 2: 
            playerContainer.removeClass("active");
            playerContainer.addClass("paused");
            break;
    }
};

function onYouTubeIframeAPIReady() {
    player = new YT.Player("yt-player", {
        height: '427',
        width: '662',
        videoId: '57XtvRwMleI',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showInfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}

eventsInit();