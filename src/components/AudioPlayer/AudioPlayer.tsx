import React, { useRef, useEffect } from 'react';
import { AudioAnalyzer } from '../../utils/audioAnalyzer';

interface AudioPlayerProps {
  onAudioData: (data: Float32Array) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ onAudioData }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyzerRef = useRef<AudioAnalyzer | null>(null);

  useEffect(() => {
    analyzerRef.current = new AudioAnalyzer();
    return () => {
      analyzerRef.current?.disconnect();
    };
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !audioRef.current) return;

    try {
      const url = URL.createObjectURL(file);
      audioRef.current.src = url;
      audioRef.current.load(); // Force reload of audio element
    } catch (error) {
      console.error('Error loading audio file:', error);
    }
  };

  const handleStartVisualization = async () => {
    if (!audioRef.current || !analyzerRef.current) return;

    try {
      await audioRef.current.play();
      analyzerRef.current.setupAudioAnalyzer(audioRef.current, (features) => {
        if (features?.amplitudeSpectrum) {
          onAudioData(features.amplitudeSpectrum);
        }
      });
    } catch (error) {
      console.error('Error starting visualization:', error);
    }
  };

  return (
    <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
      <h2 className="text-xl font-semibold text-purple-400 mb-2">Audio Input</h2>
      <div className="space-y-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          className="hidden"
          id="audio-upload"
        />
        <label
          htmlFor="audio-upload"
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer block text-center text-white"
        >
          Upload Audio File
        </label>
        <audio 
          ref={audioRef} 
          className="w-full mt-4" 
          controls 
          controlsList="noplaybackrate"
        />
        <button
          onClick={handleStartVisualization}
          className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-white font-semibold"
        >
          Start Visualization
        </button>
      </div>
    </div>
  );
};