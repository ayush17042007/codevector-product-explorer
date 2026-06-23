'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Glass Card ─────────────────────────────────────────── */
interface GlassCardProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed?: number;
  color?: string;
}

function GlassCard({ position, rotation, scale, speed = 1, color = '#6366f1' }: GlassCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = initialY + Math.sin(t * speed * 0.25) * 0.6;
    meshRef.current.rotation.x = rotation[0] + t * 0.003 * speed;
    meshRef.current.rotation.y = rotation[1] + t * 0.005 * speed;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1.6, 2.4, 0.06]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.2}
        roughness={0.05}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ─── Wireframe Octahedron ───────────────────────────────── */
function WireframeOcta({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.25;
    meshRef.current.rotation.y = t * 0.38;
    meshRef.current.position.y = initialY + Math.sin(t * 0.3) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#818cf8" transparent opacity={0.18} wireframe />
    </mesh>
  );
}

/* ─── Glowing Ambient Sphere ─────────────────────────────── */
function GlowSphere({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = initialY + Math.sin(t * 0.18 + position[0]) * 1.2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.055} />
    </mesh>
  );
}

/* ─── Floating Ring ──────────────────────────────────────── */
function Ring({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = rotation[0] + t * 0.012;
    meshRef.current.rotation.y = rotation[1] + t * 0.009;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[1.8, 0.025, 16, 100]} />
      <meshBasicMaterial color="#6366f1" transparent opacity={0.25} />
    </mesh>
  );
}

/* ─── Particle Field ─────────────────────────────────────── */
function Particles({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime() * 0.04;
    pointsRef.current.rotation.y = t;
    pointsRef.current.rotation.x = t * 0.35;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.07} color="#a5b4fc" transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

/* ─── Main Scene with Mouse Parallax ────────────────────── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth  - 0.5) * 0.55;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * 0.32;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    currentRot.current.x += ((-mouseTarget.current.y) - currentRot.current.x) * 0.04;
    currentRot.current.y += (mouseTarget.current.x   - currentRot.current.y) * 0.04;
    groupRef.current.rotation.x = currentRot.current.x;
    groupRef.current.rotation.y = currentRot.current.y;
  });

  return (
    <group ref={groupRef}>
      {/* Glass cards at varying depths */}
      <GlassCard position={[-10, 4,  -8]} rotation={[0.2,  0.4,  0.1]} scale={2.0} speed={0.8} color="#6366f1" />
      <GlassCard position={[ 9,  -3, -10]} rotation={[-0.1,-0.5,  0.2]} scale={2.5} speed={1.2} color="#8b5cf6" />
      <GlassCard position={[-7,  -7,  -5]} rotation={[0.4,  0.2, -0.3]} scale={1.6} speed={0.6} color="#06b6d4" />
      <GlassCard position={[12,   7, -14]} rotation={[-0.3, 0.6,  0.1]} scale={3.0} speed={1.0} color="#6366f1" />
      <GlassCard position={[-2,   9, -18]} rotation={[0.1, -0.3,  0.4]} scale={2.2} speed={0.7} color="#818cf8" />
      <GlassCard position={[ 4,  -9, -12]} rotation={[0.3,  0.1, -0.2]} scale={1.8} speed={0.9} color="#7c3aed" />

      {/* Wireframe shapes */}
      <WireframeOcta position={[-5,  2, -6]}  scale={1.4} />
      <WireframeOcta position={[ 7, -2, -9]}  scale={1.0} />
      <WireframeOcta position={[ 0, -5, -11]} scale={1.8} />

      {/* Floating rings */}
      <Ring position={[-4,  3, -7]}  rotation={[Math.PI / 4, 0, 0.3]} />
      <Ring position={[ 7,  0, -9]}  rotation={[0, Math.PI / 3, 0.5]} />
      <Ring position={[ 0, -3, -12]} rotation={[Math.PI / 2, 0.4, 0]} />

      {/* Ambient glow spheres */}
      <GlowSphere position={[-10,  6, -20]} color="#6366f1" scale={8}  />
      <GlowSphere position={[ 12, -5, -25]} color="#06b6d4" scale={10} />
      <GlowSphere position={[  0,  0, -30]} color="#8b5cf6" scale={14} />
      <GlowSphere position={[-14, -3, -22]} color="#3b82f6" scale={7}  />

      {/* Particles */}
      <Particles count={600} />
    </group>
  );
}

/* ─── Export ─────────────────────────────────────────────── */
export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 58 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.6} color="#6366f1" />
        <pointLight position={[10, 10,  5]} intensity={1.2} color="#818cf8" />
        <pointLight position={[-10,-10,  5]} intensity={0.9} color="#06b6d4" />
        <Scene />
      </Canvas>
    </div>
  );
}
