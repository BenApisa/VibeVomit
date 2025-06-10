import Meyda from 'meyda';

interface AudioFeatures {
  amplitudeSpectrum: Float32Array;
}

export class AudioAnalyzer {
  private audioContext: AudioContext;
  private analyzer: any;
  private source: MediaElementAudioSourceNode | null = null;

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  setupAudioAnalyzer(audioElement: HTMLAudioElement, onFeatures: (features: AudioFeatures) => void) {
    try {
      // Disconnect any existing source
      if (this.source) {
        this.source.disconnect();
      }

      // Create and connect new source
      this.source = this.audioContext.createMediaElementSource(audioElement);
      this.source.connect(this.audioContext.destination);

      // Create and start analyzer
      this.analyzer = Meyda.createMeydaAnalyzer({
        audioContext: this.audioContext,
        source: this.source,
        bufferSize: 512,
        featureExtractors: ['amplitudeSpectrum'],
        callback: onFeatures
      });

      this.analyzer.start();
    } catch (error) {
      console.error('Error setting up audio analyzer:', error);
    }
  }

  disconnect() {
    if (this.analyzer) {
      this.analyzer.stop();
    }
    if (this.source) {
      this.source.disconnect();
    }
  }
}