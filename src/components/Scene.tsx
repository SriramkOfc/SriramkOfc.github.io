"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div
        className="h-56 w-56 rounded-full opacity-70 blur-2xl"
        style={{ background: "radial-gradient(circle at 35% 35%, #ffffff, #b9c4ff 40%, #c9b8ff 65%, transparent 72%)" }}
      />
    </div>
  ),
});

export default function Scene() {
  return <Scene3D />;
}
