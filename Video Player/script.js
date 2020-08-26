const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


//Funtions

// 1. toggleVideo - Play or Pause Video
//If video is playing, then pause
//If video is paused, then play

function toggleVideo(){
   if (video.paused){
       video.play();
   } else{
       video.pause();
   }
}

// 2. updateIcon - Toggle between play and pause icon
//If video is playing, then show pause icon
//If video is paused, then show play icon

function updateIcon(){
    if(video.paused){
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';

    }else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';

    }
}


// 3. updateProgress - Update the progress bar and timestamp

function updateProgress(){
    //update slider
    progress.value = video.currentTime / video.duration * 100;

    //update timestamp

    //rounding down the minutes
    let min = Math.floor(video.currentTime / 60);
    if(min < 10){
min = `0${min}`; 
    }
    //rounding down the seconds
    let sec = Math.floor(video.currentTime %60);
    if(sec < 10){
        sec = `0${sec}`; 
            }

    //display time
    timestamp.innerHTML = `${min}:${sec}`;
    
}


// 4. stopVideo - Stop video playback and reset time to 0

function stopVideo(){
    video.pause();
    video.currentTime = 0;
}


// 5. setProgress - update video playback time based on change in progress bar

function setProgress (){
    video.currentTime = progress.value * video.duration / 100;


}



//Event Listeners

// 1. Video Element - click to play or pause video
video.addEventListener('click', toggleVideo);
// 2. Video Element - pause button show display while video is playing
video.addEventListener('pause', updateIcon);

// 3. Video Element - pause icon back to play icon
video.addEventListener('play',updateIcon);

// 4. Video Element - update progress bar and timestamp
video.addEventListener('timeupdate', updateProgress);

// 5. Play Button - Click to play or pause video
play.addEventListener('click', toggleVideo);

// 6. Stop Button - click to reset video and pause video
stop.addEventListener('click', stopVideo);

// 7. Progress Bar - change position to current progress
progress.addEventListener('change', setProgress)