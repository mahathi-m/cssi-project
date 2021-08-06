const musicContainer = document.getElementById('music-container');
const musicContainer2 = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const playBtn2 = document.getElementById('play2');
const audio = document.getElementById('audio');
const audio2 = document.getElementById('audio2');

function loadSong(song) {
  audio.src = `https://cdn.glitch.com/79de6c79-e8be-4d13-9a60-4ac754edd788%2Fchilled-acoustic-indie-folk-instrumental-background-music-for-videos-5720.mp3?v=1628087456085`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function loadSong2(song){
  audio2.src=`https://cdn.glitch.com/79de6c79-e8be-4d13-9a60-4ac754edd788%2F0127.%20Summer%20Camp%20-%20AShamaluevMusic.mp3?v=1628102851489`;
}

function playSong2() {
  musicContainer.classList.add('play2');
  playBtn2.querySelector('i.fas').classList.remove('fa-play');
  playBtn2.querySelector('i.fas').classList.add('fa-pause');

  audio2.play();
}

function pauseSong2() {
  musicContainer.classList.remove('play2');
  playBtn2.querySelector('i.fas').classList.add('fa-play');
  playBtn2.querySelector('i.fas').classList.remove('fa-pause');

  audio2.pause();
}

playBtn2.addEventListener('click', () => {
  const isPlaying = musicContainer2.classList.contains('play2');

  if (isPlaying) {
    pauseSong2();
  } else {
    playSong2();
  }
});