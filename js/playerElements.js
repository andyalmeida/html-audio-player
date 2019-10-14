export default {
  get() {
    this.cover = document.querySelector('.card-image');
    this.title = document.querySelector('.card-content h5');
    this.artist = document.querySelector('.card-content p');
    this.playButton = document.querySelector('#play-button');
    this.muteButton = document.querySelector('#volume-button');
    this.volumeControl = document.querySelector('#volume-control');
    this.timeControl = document.querySelector('#time-control');
    this.currentTime = document.querySelector('#current-time');
    this.totalTime = document.querySelector('#total-time');
  },
  createAudioElement(audio) {
    this.player = new Audio(audio);  
  },
  actions() {
    this.player.onended = () => this.next();
    this.playButton.onclick = () => this.togglePlay();
    this.muteButton.onclick = () => this.toggleMute();
    this.volumeControl.oninput = () => this.setVolume(this.volumeControl.value);
    this.timeControl.oninput = () => this.setTime(this.timeControl.value);
    this.player.ontimeupdate = () => this.timeUpdate();
  }
}