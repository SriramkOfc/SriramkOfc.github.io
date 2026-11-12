"use client";

// "Context in, accurate output out." A 3D diagram of the LLM work Sriram does:
// three context sources feed a model; one answer comes out (the only orange object).

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, QuadraticBezierLine, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, QuadraticBezierCurve3, SRGBColorSpace, Vector3, type Group, type Mesh } from "three";

const INK = "#151515";
const ORANGE = "#ff4d00";
const LINE = "#cfcbc2";

const inputs = [
  { label: "Adviser notes", y: 1.05 },
  { label: "Client data", y: 0 },
  { label: "Compliance rules", y: -1.05 },
];

const IN_X = -3.7;
const CORE_X = 0.3;
const OUT_X = 4.0;


/** Draws a label (and optional "text line" bars) to a canvas texture using the page's Inter font. */
function useLabelTexture(
  label: string,
  opts: { w: number; h: number; fg: string; bg: string; bars?: string; size?: number; align?: "left" | "center" },
) {
  const { w, h, fg, bg, bars, size = 30, align = "left" } = opts;
  const [tex, setTex] = useState<CanvasTexture | null>(null);

  useEffect(() => {
    let alive = true;
    let made: CanvasTexture | null = null;
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
      if (!alive) return;
      const c = document.createElement("canvas");
      c.width = Math.round(w * 220);
      c.height = Math.round(h * 220);
      const ctx = c.getContext("2d");
      if (!ctx) return;
      const family = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
      if (bg !== "transparent") {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, c.width, c.height);
      }
      const pad = 38;
      ctx.fillStyle = fg;
      ctx.font = `600 ${size}px ${family}`;
      ctx.textAlign = align;
      const x = align === "center" ? c.width / 2 : pad;
      ctx.fillText(label, x, bars ? c.height * 0.46 : c.height * 0.62);
      if (bars) {
        ctx.fillStyle = bars;
        const y = c.height * 0.64;
        const avail = c.width - pad * 2;
        let bx = pad;
        [0.5, 0.28, 0.14].forEach((f) => {
          const bw = avail * f;
          ctx.beginPath();
          ctx.roundRect(bx, y, bw, 9, 4.5);
          ctx.fill();
          bx += bw + 12;
        });
      }
      made = new CanvasTexture(c);
      made.colorSpace = SRGBColorSpace;
      made.anisotropy = 8;
      setTex(made);
    });
    return () => {
      alive = false;
      made?.dispose();
    };
  }, [label, w, h, fg, bg, bars, size, align]);

  return tex;
}

function Card({
  position,
  label,
  accent = false,
  width = 2.3,
}: {
  position: [number, number, number];
  label: string;
  accent?: boolean;
  width?: number;
}) {
  const ref = useRef<Group>(null);
  const seed = position[1] * 3.1;
  const tex = useLabelTexture(label, {
    w: width - 0.08,
    h: 0.66,
    fg: accent ? "#ffffff" : "#111111",
    bg: accent ? ORANGE : "#ffffff",
    bars: accent ? "rgba(255,255,255,0.55)" : "#ebe8e1",
  });
  useFrame((s) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(s.clock.elapsedTime * 0.9 + seed) * 0.04;
  });
  return (
    <group ref={ref} position={position}>
      <RoundedBox args={[width, 0.74, 0.08]} radius={0.06} smoothness={4} castShadow>
        <meshStandardMaterial color={accent ? ORANGE : "#ffffff"} roughness={0.55} />
      </RoundedBox>
      <mesh position={[0, 0, 0.042]}>
        <planeGeometry args={[width - 0.08, 0.66]} />
        <meshBasicMaterial key={tex ? "t" : "n"} map={tex} color={tex ? "#ffffff" : accent ? ORANGE : "#ffffff"} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Packet({ curve, offset, color }: { curve: QuadraticBezierCurve3; offset: number; color: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = (s.clock.elapsedTime * 0.28 + offset) % 1;
    ref.current.position.copy(curve.getPoint(t));
    const fade = Math.min(1, t * 6, (1 - t) * 6);
    ref.current.scale.setScalar(0.4 + fade * 0.6);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

function Core({ position, labelAt }: { position: [number, number, number]; labelAt: [number, number, number] }) {
  const ref = useRef<Group>(null);
  const labelTex = useLabelTexture("LLM", { w: 1.2, h: 0.36, fg: "#111111", bg: "transparent", size: 34, align: "center" });
  useFrame((s, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.25;
      ref.current.position.y = Math.sin(s.clock.elapsedTime * 0.7) * 0.05;
    }
  });
  return (
    <group position={position}>
      <group ref={ref}>
        <RoundedBox args={[1.45, 1.45, 1.45]} radius={0.14} smoothness={6} rotation={[0.42, 0, 0.32]} castShadow>
          <meshStandardMaterial color={INK} roughness={0.32} metalness={0.15} />
        </RoundedBox>
      </group>
      <mesh position={labelAt}>
        <planeGeometry args={[1.2, 0.36]} />
        <meshBasicMaterial key={labelTex ? "t" : "n"} map={labelTex} transparent opacity={labelTex ? 1 : 0} toneMapped={false} />
      </mesh>
    </group>
  );
}

type Layout = {
  inputs: [number, number, number][];
  core: [number, number, number];
  coreLabel: [number, number, number];
  out: [number, number, number];
  curvesIn: QuadraticBezierCurve3[];
  curveOut: QuadraticBezierCurve3;
  shadowY: number;
  frame: { w: number; h: number; cx: number; cy: number };
};

const v = (x: number, y: number) => new Vector3(x, y, 0);

function makeLayout(vertical: boolean): Layout {
  if (!vertical) {
    return {
      inputs: inputs.map((c) => [IN_X, c.y, 0]),
      core: [CORE_X, 0, 0],
      coreLabel: [0, -1.32, 0],
      out: [OUT_X, 0, 0],
      curvesIn: inputs.map(
        (c) => new QuadraticBezierCurve3(v(IN_X + 1.15, c.y), v((IN_X + CORE_X) / 2, c.y * 0.35), v(CORE_X - 0.85, 0)),
      ),
      curveOut: new QuadraticBezierCurve3(v(CORE_X + 0.85, 0), v(2.4, 0), v(OUT_X - 1.15, 0)),
      shadowY: -1.75,
      frame: { w: 11.2, h: 4.4, cx: 0, cy: -0.1 },
    };
  }
  // Portrait (phones): inputs stacked on top, model in the middle, output at the bottom.
  const ys = [3.05, 2.15, 1.25];
  const coreY = -0.75;
  return {
    inputs: ys.map((y) => [0, y, 0]),
    core: [0, coreY, 0],
    coreLabel: [1.35, 0, 0],
    out: [0, -2.85, 0],
    curvesIn: ys.map((y) => new QuadraticBezierCurve3(v(1.15, y), v(1.85, coreY + 0.9), v(0.45, coreY + 0.65))),
    curveOut: new QuadraticBezierCurve3(v(0, coreY - 0.85), v(0, -1.95), v(0, -2.47)),
    shadowY: -3.45,
    frame: { w: 4.6, h: 7.4, cx: 0.3, cy: 0.05 },
  };
}

function Pipeline({ layout }: { layout: Layout }) {
  const group = useRef<Group>(null);

  useFrame((s) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += (s.pointer.x * 0.12 - 0.08 - g.rotation.y) * 0.04;
    g.rotation.x += (-s.pointer.y * 0.05 + 0.04 - g.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      {inputs.map((c, i) => (
        <Card key={c.label} position={layout.inputs[i]} label={c.label} />
      ))}

      {layout.curvesIn.map((c, i) => (
        <group key={i}>
          <QuadraticBezierLine start={c.v0} mid={c.v1} end={c.v2} color={LINE} lineWidth={1.2} />
          <Packet curve={c} offset={i * 0.33} color={INK} />
          <Packet curve={c} offset={i * 0.33 + 0.5} color={INK} />
        </group>
      ))}

      <Core position={layout.core} labelAt={layout.coreLabel} />

      <QuadraticBezierLine
        start={layout.curveOut.v0}
        mid={layout.curveOut.v1}
        end={layout.curveOut.v2}
        color={LINE}
        lineWidth={1.2}
      />
      <Packet curve={layout.curveOut} offset={0} color={ORANGE} />
      <Packet curve={layout.curveOut} offset={0.5} color={ORANGE} />

      <Card position={layout.out} label="Accurate output" accent />
    </group>
  );
}

/** Picks a layout for the canvas shape and keeps the whole diagram in frame. */
function Diagram() {
  const { camera, size } = useThree();
  const aspect = size.width / size.height;
  const vertical = aspect < 1.1;
  const layout = useMemo(() => makeLayout(vertical), [vertical]);

  useEffect(() => {
    const { w, h, cx, cy } = layout.frame;
    const tan = Math.tan((30 * Math.PI) / 360);
    const z = Math.max(h / (2 * tan), w / (2 * tan * aspect)) * 1.08;
    camera.position.set(cx, cy + 0.55, z);
    camera.lookAt(cx, cy - 0.15, 0);
  }, [camera, aspect, layout]);

  return (
    <>
      <Pipeline layout={layout} />
      <ContactShadows position={[0, layout.shadowY, 0]} opacity={0.18} scale={14} blur={2.6} far={3} color="#2b261d" />
    </>
  );
}

export default function Scene3D() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.5, 10], fov: 30 }} gl={{ antialias: true, alpha: true }} shadows>
      <ambientLight intensity={0.9} />
      <directionalLight position={[-3, 5, 6]} intensity={1.4} castShadow />
      <Diagram />
      <Environment resolution={128}>
        <color attach="background" args={["#f7f6f3"]} />
        <Lightformer form="rect" intensity={1.4} position={[-4, 4, 5]} scale={[8, 6, 1]} onUpdate={(s) => s.lookAt(0, 0, 0)} />
        <Lightformer form="rect" intensity={0.7} position={[5, 1, 4]} scale={[4, 4, 1]} onUpdate={(s) => s.lookAt(0, 0, 0)} />
      </Environment>
    </Canvas>
  );
}
