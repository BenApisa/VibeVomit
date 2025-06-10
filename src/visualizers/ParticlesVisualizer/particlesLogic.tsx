import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  audioData?: Float32Array;
  prompt?: string;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ audioData, prompt }) => {
  const points = useRef<THREE.Points>(null!);
  
  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame(() => {
    if (!points.current) return;
    
    points.current.rotation.x += 0.001;
    points.current.rotation.y += 0.002;
    
    if (audioData) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const amp = audioData[i % audioData.length] || 0;
        positions[i + 1] += amp * 0.1;
      }
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points} geometry={particles}>
      <pointsMaterial 
        size={0.1}
        color={prompt ? '#8B5CF6' : '#FFFFFF'}
        transparent
        opacity={0.8}
      />
    </points>
  );
};