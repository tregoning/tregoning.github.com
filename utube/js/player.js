var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height          :  (window.innerHeight / 4) * 3, // 3/4 of the window height
        width           :  window.innerWidth,
        suggestedQuality: 'highres',
        videoId         : id,
        events          : {
            'onReady'      : onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    //event.data == YT.PlayerState.PLAYING
}

function stopVideo() {
    player.stopVideo();
}