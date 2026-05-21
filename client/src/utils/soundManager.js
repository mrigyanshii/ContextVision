import { Howl } from 'howler';

// Synthesized small audio blobs (Data URIs)
const clickSoundUrl = 'data:audio/mp3;base64,//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//OExEAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
const alertSoundUrl = 'data:audio/mp3;base64,//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//OExEAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';

// Actually, generating sounds via Web Audio API directly is better for synthesized UI sounds.
// We'll use Howler for structure, but since we don't have assets, we'll wrap Web Audio.

class SoundManager {
  constructor() {
    this.enabled = true;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playUIHover() {
    if (!this.enabled) return;
    this._playTone(400, 'sine', 0.05, 0.1);
  }

  playUIClick() {
    if (!this.enabled) return;
    this._playTone(800, 'sine', 0.1, 0.2);
  }

  playAlert() {
    if (!this.enabled) return;
    this._playTone(300, 'square', 0.3, 0.8);
    setTimeout(() => this._playTone(250, 'square', 0.3, 0.8), 200);
  }

  _playTone(freq, type, vol, duration) {
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    
    osc.start();
    osc.stop(this.audioCtx.currentTime + duration);
  }
}

export const soundManager = new SoundManager();
