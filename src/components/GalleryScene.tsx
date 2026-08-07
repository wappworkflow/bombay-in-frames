"use client";
/* eslint-disable react-hooks/immutability -- react-three-fiber's canonical pattern: useFrame mutates three.js objects (camera, textures, meshes) imperatively every frame; this never touches React state or triggers a re-render, so React's purity rules don't apply here. */

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const FRAME_IMAGES = [
  "https://picsum.photos/seed/bif-gallery-01/900/1200",
  "https://picsum.photos/seed/bif-gallery-02/900/1200",
  "https://picsum.photos/seed/bif-gallery-03/900/1200",
  "https://picsum.photos/seed/bif-gallery-04/900/1200",
  "https://picsum.photos/seed/bif-gallery-05/900/1200",
  "https://picsum.photos/seed/bif-gallery-06/900/1200",
  "https://picsum.photos/seed/bif-gallery-07/900/1200",
  "https://picsum.photos/seed/bif-gallery-08/900/1200",
  "https://picsum.photos/seed/bif-gallery-09/900/1200",
  "https://picsum.photos/seed/bif-gallery-10/900/1200",
];

const SPACING = 7;

function Frame({
  position,
  rotationY,
  url,
}: {
  position: [number, number, number];
  rotationY: number;
  url: string;
}) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, -0.06]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 3.3, 0.1]} />
        <meshStandardMaterial color="#9c7a42" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.15, 2.95]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
      <pointLight position={[0, 1.9, 0.9]} intensity={2.4} color="#f2d9a8" distance={5} decay={2} />
    </group>
  );
}

function Hallway({ length }: { length: number }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, -length / 2]} receiveShadow>
        <planeGeometry args={[10, length + 20]} />
        <meshStandardMaterial color="#1c1712" roughness={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.2, -length / 2]}>
        <planeGeometry args={[10, length + 20]} />
        <meshStandardMaterial color="#0d0b08" roughness={1} />
      </mesh>
    </>
  );
}

function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const smoothed = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    smoothed.current += (progress.current - smoothed.current) * 0.07;
    const travel = smoothed.current * (FRAME_IMAGES.length * SPACING - 6);
    const z = 5 - travel;
    camera.position.z += (z - camera.position.z) * 0.15;
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.05;
    camera.position.y += (1.5 - mouse.current.y * 0.3 - camera.position.y) * 0.05;
    camera.rotation.y += (-mouse.current.x * 0.12 - camera.rotation.y) * 0.08;
    camera.lookAt(0, 1.5, camera.position.z - 10);
  });

  return null;
}

export default function GalleryScene({ progress }: { progress: React.MutableRefObject<number> }) {
  const frames = useMemo(
    () =>
      FRAME_IMAGES.map((url, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        return {
          url,
          position: [side * 3.6, 1.5, -i * SPACING] as [number, number, number],
          rotationY: side * -0.42,
        };
      }),
    []
  );

  const length = FRAME_IMAGES.length * SPACING;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.5, 5], fov: 58, near: 0.1, far: 100 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#100d09"]} />
      <fog attach="fog" args={["#100d09", 9, 32]} />
      <ambientLight intensity={0.4} color="#caa15e" />
      <hemisphereLight intensity={0.25} color="#dcb876" groundColor="#100d09" />
      <Hallway length={length} />
      <Suspense fallback={null}>
        {frames.map((f, i) => (
          <Frame key={i} position={f.position} rotationY={f.rotationY} url={f.url} />
        ))}
      </Suspense>
      <Rig progress={progress} />
    </Canvas>
  );
}
