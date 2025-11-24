/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Stars, Environment, Torus } from '@react-three/drei';
import * as THREE from 'three';

const PrivacyShieldNode = ({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = t * 0.2 * speed;
      ref.current.rotation.y = t * 0.3 * speed;
      // Gentle pulsing
      const s = scale + Math.sin(t * 2) * 0.05;
      ref.current.scale.set(s, s, s);
    }
  });

  return (
    <Icosahedron ref={ref} args={[1, 0]} position={position}>
      <meshStandardMaterial
        color="#A78BFA"
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </Icosahedron>
  );
};

const ProtectedCore = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.position.y = Math.sin(t) * 0.1;
        }
    });

    return (
        <Sphere ref={ref} args={[0.8, 64, 64]}>
            <MeshDistortMaterial
                color="#7C3AED"
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.1}
                distort={0.3}
                speed={2}
            />
        </Sphere>
    )
}

const ScanningRing = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.rotation.x = Math.PI / 2;
            ref.current.rotation.z = t * 0.5;
            ref.current.scale.x = 1.5 + Math.sin(t) * 0.2;
            ref.current.scale.y = 1.5 + Math.sin(t) * 0.2;
        }
    });

    return (
        <Torus ref={ref} args={[2, 0.02, 16, 100]}>
            <meshBasicMaterial color="#F472B6" transparent opacity={0.5} />
        </Torus>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F472B6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7C3AED" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ProtectedCore />
          <ScanningRing />
          <group rotation={[0,0,Math.PI/4]}>
             <PrivacyShieldNode position={[2, 1, 0]} scale={0.4} />
             <PrivacyShieldNode position={[-2, -1, 0.5]} scale={0.3} speed={1.5} />
             <PrivacyShieldNode position={[0, 2.5, -1]} scale={0.2} speed={2} />
          </group>
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const NetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#7C3AED" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.2} speed={1}>
             <group>
                {/* Abstract Node Network */}
                {[...Array(5)].map((_, i) => (
                    <mesh key={i} position={[Math.sin(i)*2, Math.cos(i)*2, Math.sin(i*2)]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#A78BFA" emissive="#7C3AED" emissiveIntensity={0.5} />
                    </mesh>
                ))}
                
                {/* Connections */}
                <mesh position={[0,0,0]} rotation={[0,0,Math.PI/4]}>
                    <torusGeometry args={[2.5, 0.01, 8, 64]} />
                    <meshBasicMaterial color="#E5E7EB" transparent opacity={0.2} />
                </mesh>
             </group>
        </Float>
      </Canvas>
    </div>
  );
}