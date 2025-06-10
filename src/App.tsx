import React, { useState } from 'react';
import { ParticlesVisualizer } from './visualizers/ParticlesVisualizer/ParticlesVisualizer';
import { AudioPlayer } from './components/AudioPlayer/AudioPlayer';

function App() {
  const [audioData, setAudioData] = useState<Float32Array>(new Float32Array());
  const [prompt, setPrompt] = useState<string>('');
  const [activePrompt, setActivePrompt] = useState<string>('');

  const handlePromptSubmit = () => {
    if (prompt.trim()) {
      setActivePrompt(prompt);
    }
  };

  const handleAudioData = (data: Float32Array) => {
    setAudioData(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-purple-500">VibeVomit</h1>
        <p className="text-gray-400">Transform audio & text into visual art</p>
      </header>

      {/* Visualization Area */}
      <div className="h-[60vh] bg-black/50 rounded-lg border border-purple-500/20 mb-4 overflow-hidden">
        <ParticlesVisualizer audioData={audioData} prompt={activePrompt} />
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AudioPlayer onAudioData={handleAudioData} />
        
        {/* Text Prompt */}
        <div className="p-4 bg-black/30 rounded-lg border border-purple-500/20">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Text Prompt</h2>
          <div className="space-y-4">
            <input 
              type="text"
              placeholder="Enter a mood or description..."
              className="w-full p-3 bg-black/50 border border-purple-500/20 rounded-lg text-white"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePromptSubmit()}
            />
            <button
              onClick={handlePromptSubmit}
              className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-white font-semibold"
            >
              Apply Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
