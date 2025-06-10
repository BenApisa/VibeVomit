import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ParticleSystem } from './particlesLogic';

interface ParticlesVisualizerProps {
  audioData?: Float32Array;
  prompt?: string;
}

export const ParticlesVisualizer: React.FC<ParticlesVisualizerProps> = ({ audioData, prompt }) => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ParticleSystem audioData={audioData} prompt={prompt} />
      <OrbitControls />
    </Canvas>
  );
};