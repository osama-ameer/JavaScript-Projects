const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
var VolumeSlider =document.querySelector('.volume-bar');

//list of songs

const songList = [ 'Aap Baithay Hain ', 
                     'Animals',
                     'Jabr k andheron mein',
                     'Morey Angna',
                     'Tajdar-e-Haram' ];



// track which song is currently playing

let currentSong = 0;

// update the song to the dom 
function loadSong(song){
    title.innerText = song;
    audio.src = `Music/${song}.mp3`;
    cover.src = `Images/${song}.jpg`;
}

//function to play the song
function playSong(){
    musicContainer.classList.add('play');

    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');

    audio.play();

}

//function to pause the song

function pauseSong(){
    musicContainer.classList.remove('play');

    playButton.querySelector('i.fas').classList.remove('fa-pause');
    playButton.querySelector('i.fas').classList.add('fa-play');

    audio.pause();

}


//function to switch to previous song

function prevSong(){
    currentSong--;

    if(currentSong < 0){
        currentSong = songList.length - 1;
    }

    loadSong(songList[currentSong]);
    playSong();



}


//function to switch to next song

function nextSong(){
    currentSong++;

    if(currentSong > 4){
        currentSong = 0;
    }

    loadSong(songList[currentSong]);
    playSong();



}


//function to update the progress bar

function updateProgress(e){
    const { currentTime, duration} = e.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;

}

//function to set progress bar

function setProgress(e){
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = ( offsetX / width ) * duration;


}




//inital song load
loadSong(songList[currentSong]);


//event listeners
playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying){
        pauseSong();
    }else{
        playSong();
    }
})


prevButton.addEventListener('click',prevSong);

nextButton.addEventListener('click', nextSong);

//event listener for update the time for song play
audio.addEventListener('timeupdate', updateProgress);

VolumeSlider.addEventListener('input', function(){
    audio.volume= parseInt(this.value)/10;
    step=.01;
    min=0;
    max=1;
    value=0.5;
    }, false);


// update the time for song play based on click progreess

progressContainer.addEventListener('click',setProgress);


//automatically play next song
audio.addEventListener('ended', nextSong)