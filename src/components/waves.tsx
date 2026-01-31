"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export function Waves({
  lineColor = "#66FCF1",
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  xGap = 10,
  yGap = 32,
  friction = 0.925,
  tension = 0.005,
  maxCursorMove = 100,
  style = {},
  className = "",
}: {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}
      style={{
        background: backgroundColor,
        ...style,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 200], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <WaveParticles
          lineColor={lineColor}
          waveSpeedX={waveSpeedX}
          waveSpeedY={waveSpeedY}
          waveAmpX={waveAmpX}
          waveAmpY={waveAmpY}
          xGap={xGap}
          yGap={yGap}
          friction={friction}
          tension={tension}
          maxCursorMove={maxCursorMove}
        />
      </Canvas>
    </div>
  );
}

function WaveParticles({
  lineColor,
  waveSpeedX,
  waveSpeedY,
  waveAmpX,
  waveAmpY,
  xGap,
  yGap,
  friction,
  tension,
  maxCursorMove,
}: {
  lineColor: string;
  waveSpeedX: number;
  waveSpeedY: number;
  waveAmpX: number;
  waveAmpY: number;
  xGap: number;
  yGap: number;
  friction: number;
  tension: number;
  maxCursorMove: number;
}) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const particles = [];
    const width = 1000; // Arbitrary wide content
    const height = 1000;
    const cols = Math.ceil(width / xGap);
    const rows = Math.ceil(height / yGap);

    for (let i = 0; i < cols * rows; i++) {
        // Simple grid
        const col = i % cols;
        const row = Math.floor(i / cols);
        particles.push((col * xGap) - width / 2, (row * yGap) - height / 2, 0);
    }
    return new Float32Array(particles);
  }, [xGap, yGap]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    // Simple wave animation
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    
    for(let i = 0; i < positions.length; i+=3) {
        // x remains somewhat static for now, z moves
        const x = positions[i];
        const y = positions[i+1];
        
        // This is a simplified wave implementation
        positions[i+2] = Math.sin(x * 0.01 + time) * waveAmpX + Math.sin(y * 0.01 + time) * waveAmpY;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={lineColor}
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}
