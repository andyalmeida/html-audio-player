import audios from './data.js';
import { path, secondsToMinutes } from './utils.js';
import elements from './playerElements.js';

export default {
  audioList: audios,
  playingTrack: 0,
  currentAudio: {},
  isPlaying: false,
  start() {
    elements.get.call(this);
    this.update();
  },
  play() {
    this.isPlaying = true;
    this.player.play();
    this.playButton.textContent = 'pause';
  },
  pause() {
    this.isPlaying = false;
    this.player.pause();
    this.playButton.textContent = 'play_arrow';
  },
  togglePlay() {
    this.isPlaying ? this.pause() : this.play();
  },
  toggleMute() {
    this.player.muted = !this.player.muted;
    this.muteButton.textContent = this.player.muted ? 'volume_off' : 'volume_up';  
  },
  setVolume(volume) {
    this.player.volume = volume / 100;
  },
  setTime(time) {
    this.player.currentTime = time;
  },
  timeUpdate() {
    this.currentTime.textContent = secondsToMinutes(this.player.currentTime);
    this.timeControl.value = this.player.currentTime;
  },
  next() {
    if(++this.playingTrack === this.audioList.length) 
      this.playingTrack = 0;
    this.update();
    this.player.play();
  },
  update() {
    this.currentAudio = this.audioList[this.playingTrack];
    this.cover.style.background = `url("${path(this.currentAudio.cover)}") no-repeat center center / cover`;
    this.title.textContent = this.currentAudio.title;
    this.artist.textContent = this.currentAudio.artist;
    elements.createAudioElement.call(this, path(this.currentAudio.file));
    this.player.onloadedmetadata = () => {
      elements.actions.call(this); 
      this.timeControl.max = Math.floor(this.player.duration);
      this.totalTime.textContent = secondsToMinutes(this.player.duration);
    }
  }
}