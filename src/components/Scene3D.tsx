"use client";

// Original Spline-style 3D scene, built with three.js / react-three-fiber.
// A glass "AI core" with an iridescent knot inside, orbited by glossy spheres.

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useRef, useState } from "react";
import { Color, type Group, type Mesh } from "three";

const BG = new Color("#f3f3f7");

function Core({ lite }: { lite: boolean }) {
  const knot = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!knot.current) return;
    knot.current.rotation.x += dt * 0.25;
    knot.current.rotation.y += dt * 0.35;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      {/* glass shell */}
      <mesh>
        <sphereGeometry args={[1.45, 96, 96]} />
        {lite ? (
          <meshPhysicalMaterial
            transmission={1}
            thickness={0.6}
            roughness={0.05}
            ior={1.3}
            clearcoat={1}
            color="#ffffff"
            attenuationColor="#dfe6ff"
            attenuationDistance={2}
          />
        ) : (
          <MeshTransmissionMaterial
            samples={6}
            resolution={512}
            thickness={0.55}
            roughness={0.04}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.25}
            distortionScale={0.4}
            temporalDistortion={0.08}
            ior={1.25}
            color="#ffffff"
            backside={false}
            background={BG}
          />
        )}
      </mesh>

      {/* iridescent heart */}
      <mesh ref={knot} scale={0.52}>
        <torusKnotGeometry args={[1, 0.34, 220, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#5b6cff"
          metalness={0.35}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={1}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[200, 900]}
        />
      </mesh>
    </Float>
  );
}

function Orb({
  position,
  radius,
  color,
  metal = 0.1,
  speed = 1,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  metal?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed * 2} rotationIntensity={0.6} floatIntensity={1.6}>
      <mesh position={position}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshPhysicalMaterial color={color} metalness={metal} roughness={0.12} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
    </Float>
  );
}

function Ring() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z += dt * 0.15;
  });
  return (
    <mesh ref={ref} rotation={[1.2, 0.3, 0]} scale={1}>
      <torusGeometry args={[2.25, 0.035, 32, 200]} />
      <meshPhysicalMaterial color="#d7dbff" metalness={0.85} roughness={0.18} clearcoat={1} />
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += (state.pointer.x * 0.35 - g.rotation.y) * 0.05;
    g.rotation.x += (-state.pointer.y * 0.2 - g.rotation.x) * 0.05;
  });
  return <group ref={group}>{children}</group>;
}

export default function Scene3D() {
  // Lighter glass shader on small / touch screens (component is client-only).
  const [lite] = useState(() => window.matchMedia("(max-width: 768px), (pointer: coarse)").matches);

  return (
    <Canvas
      dpr={[1, lite ? 1.5 : 2]}
      camera={{ position: [0, 0, 8.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />

      <Rig>
        <Core lite={lite} />
        <Ring />
        <Orb position={[-2.1, 1.25, 0.4]} radius={0.32} color="#0066ff" speed={1.1} />
        <Orb position={[2.15, -0.95, 0.6]} radius={0.42} color="#ff9f7a" speed={0.9} />
        <Orb position={[1.75, 1.55, -0.8]} radius={0.2} color="#7c5cff" speed={1.3} />
        <Orb position={[-1.7, -1.45, 0.9]} radius={0.24} color="#e8e8ed" metal={0.9} speed={1.2} />
      </Rig>

      <ContactShadows position={[0, -2.05, 0]} opacity={0.2} scale={6.5} blur={2.8} far={4} color="#2b2b6b" />

      {/* Studio lighting — no external HDRI needed */}
      <Environment resolution={256}>
        <color attach="background" args={["#e9e9f2"]} />
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          <Lightformer form="ring" color="#7c5cff" intensity={6} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
          <Lightformer form="rect" color="#ff9f7a" intensity={3} position={[-8, -4, 4]} scale={[6, 2, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </group>
      </Environment>
    </Canvas>
  );
}
