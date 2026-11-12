"use client";

// A small ceramic still life: plinth, sphere, column, ring and one orange marker.
// Matte materials, soft daylight, slow drift. Built with react-three-fiber.

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const CLAY = { color: "#ebe8e2", roughness: 0.82, metalness: 0 };
const CLAY_DARK = { color: "#d9d5cc", roughness: 0.85, metalness: 0 };

function StillLife() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const targetY = -0.35 + Math.sin(t * 0.18) * 0.22 + state.pointer.x * 0.25;
    const targetX = state.pointer.y * -0.06;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
  });

  return (
    <group ref={group} position={[0, -0.15, 0]}>
      {/* plinth */}
      <RoundedBox args={[2.6, 0.45, 2.1]} radius={0.04} smoothness={4} position={[0, -1.12, 0]} castShadow receiveShadow>
        <meshStandardMaterial {...CLAY_DARK} />
      </RoundedBox>

      {/* sphere */}
      <mesh position={[-0.45, -0.02, -0.15]} castShadow receiveShadow>
        <sphereGeometry args={[0.88, 96, 96]} />
        <meshStandardMaterial {...CLAY} />
      </mesh>

      {/* column */}
      <mesh position={[0.72, 0.18, -0.35]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 2.15, 64]} />
        <meshStandardMaterial {...CLAY} />
      </mesh>

      {/* ring, leaning against the column */}
      <mesh position={[0.55, -0.4, 0.55]} rotation={[0.05, -0.6, 0.18]} castShadow receiveShadow>
        <torusGeometry args={[0.42, 0.13, 48, 96]} />
        <meshStandardMaterial {...CLAY_DARK} />
      </mesh>

      {/* the one accent */}
      <mesh position={[-0.75, -0.69, 0.75]} castShadow receiveShadow>
        <sphereGeometry args={[0.2, 64, 64]} />
        <meshStandardMaterial color="#ff4d00" roughness={0.55} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      shadows="soft"
      dpr={[1, 2]}
      camera={{ position: [5.4, 2.7, 7.2], fov: 28 }}
      onCreated={({ camera }) => camera.lookAt(0, -0.35, 0)}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[-4, 6, 3]}
        intensity={1.9}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-radius={8}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />

      <StillLife />

      <ContactShadows position={[0, -1.52, 0]} opacity={0.28} scale={9} blur={2.4} far={2} color="#3a3428" />

      <Environment resolution={128}>
        <color attach="background" args={["#f6f5f2"]} />
        <Lightformer form="rect" intensity={1.6} position={[-5, 4, 2]} scale={[6, 6, 1]} onUpdate={(s) => s.lookAt(0, 0, 0)} />
        <Lightformer form="rect" intensity={0.8} color="#fff4ea" position={[5, 2, 4]} scale={[4, 4, 1]} onUpdate={(s) => s.lookAt(0, 0, 0)} />
      </Environment>
    </Canvas>
  );
}
