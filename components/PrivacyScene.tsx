
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Icosahedron, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ShieldNode = ({ position, scale = 1, speed = 1, color = "#7C3AED" }: { position: [number, number, number]; scale?: number; speed?: number; color?: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = t * 0.2 * speed;
      ref.current.rotation.y = t * 0.3 * speed;
      const s = scale + Math.sin(t * 2) * 0.05 * scale;
      ref.current.scale.set(s, s, s);
    }
  });

  return (
    <Icosahedron ref={ref} args={[1, 0]} position={position}>
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        wireframe
        transparent
        opacity={0.6}
      />
    </Icosahedron>
  );
};

const ProtectedCore = () => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            // Gentle floating
            ref.current.position.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <Sphere ref={ref} args={[1, 64, 64]}>
            <MeshDistortMaterial
                color="#F5F3FF"
                envMapIntensity={1.5}
                clearcoat={1}
                clearcoatRoughness={0.1}
                metalness={0.2}
                roughness={0.1}
                distort={0.4}
                speed={1.5}
            />
        </Sphere>
    )
}

const OrbitingRing = ({ radius, speed, color }: { radius: number, speed: number, color: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if(ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2;
            ref.current.rotation.y = t * speed * 0.2;
            ref.current.rotation.z = t * speed;
        }
    });

    return (
        <Torus ref={ref} args={[radius, 0.02, 16, 100]}>
            <meshBasicMaterial color={color} transparent opacity={0.4} />
        </Torus>
    )
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#F472B6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#7C3AED" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ProtectedCore />
          <OrbitingRing radius={1.8} speed={0.5} color="#7C3AED" />
          <OrbitingRing radius={2.2} speed={-0.3} color="#F472B6" />
          
          <group rotation={[0,0,Math.PI/6]}>
             <ShieldNode position={[2.5, 1, -1]} scale={0.5} color="#A78BFA" />
             <ShieldNode position={[-2.5, -1, 0.5]} scale={0.4} speed={1.5} color="#F9A8D4" />
             <ShieldNode position={[0, 3, -2]} scale={0.3} speed={2} color="#DDD6FE" />
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
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.5} penumbra={1} intensity={2} color="#7C3AED" />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.4} floatIntensity={0.4} speed={1.5}>
             <group>
                {/* Neural Network Abstract Representation */}
                {[...Array(7)].map((_, i) => (
                    <mesh key={i} position={[
                        Math.sin(i * 1.5) * 2.5, 
                        Math.cos(i * 1.2) * 2, 
                        Math.sin(i * 2.5) * 1.5
                    ]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial color="#fff" emissive="#A78BFA" emissiveIntensity={0.8} />
                    </mesh>
                ))}
                
                {/* Connecting Lines (Simplified as a Torus Knot for complexity) */}
                <mesh position={[0,0,0]} rotation={[0,0,0]}>
                     <torusKnotGeometry args={[1.5, 0.02, 128, 8, 2, 3]} />
                     <meshBasicMaterial color="#7C3AED" transparent opacity={0.15} wireframe />
                </mesh>
             </group>
        </Float>
      </Canvas>
    </div>
  );
}
