"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/models/pwht.glb");
  const ref = useRef<any>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={2.2}
      position={[0, -1, 0]}
      castShadow
    />
  );
}

function AnimatedCamera() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(8, 4, 8); // start far
  }, [camera]);

  useFrame(() => {
    camera.position.lerp(new THREE.Vector3(4.5, 2.2, 4.5), 0.025);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Floor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.2, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      <shadowMaterial opacity={0.25} />
    </mesh>
  );
}

function RedGlow() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2.15, 0]}
    >
      <circleGeometry args={[2.5, 64]} />
      <meshBasicMaterial
        color="#d71920"
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function ScrollZoom() {
  const { camera } = useThree();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const zoomFactor = Math.min(scrollY / 1000, 1);

      camera.position.lerp(
        new THREE.Vector3(
          4.5 - zoomFactor * 0.5,
          2.2 - zoomFactor * 0.3,
          4.5 - zoomFactor * 0.5
        ),
        0.05
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [camera]);

  return null;
}

export default function PWHT3D() {
  return (
    <div
      style={{
        height: "650px",
        width: "100%",
      }}
      className="relative overflow-hidden bg-black"
    >
      <Canvas shadows camera={{ fov: 38 }}>
        <ambientLight intensity={0.6} />

        <directionalLight
          position={[6, 8, 6]}
          intensity={1.8}
          castShadow
        />

        <Suspense fallback={null}>
          <AnimatedCamera />
          <ScrollZoom />
          <Model />
          <Floor />
          <RedGlow />
          <Environment preset="warehouse" />
        </Suspense>

        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={3.5}
          maxDistance={6.5}
        />
      </Canvas>
    </div>
  );
}