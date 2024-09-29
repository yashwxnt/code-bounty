"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { FaCode, FaRocket } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useFBX, useAnimations, PerspectiveCamera, RandomizedLight } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as THREE from 'three';

function Player({ isMobile }) {
  const group = useRef();
  const { nodes, materials, scene } = useGLTF("/assets/3D/player.gltf");
  const { animations } = useFBX("/assets/3D/standing-greeting.fbx");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions["mixamo.com"]) {
      actions["mixamo.com"].reset().play();
    }
  }, [actions]);

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Camera adjustments */}
      <PerspectiveCamera
        makeDefault
        position={[0, 40, -40]}
        fov={30}
        near={1}
        far={120}
        zoom={isMobile ? 2 : 3}
      />
      <RandomizedLight position={[0, 1, 0]} />
      <pointLight intensity={2} position={[1, 1.5, 0]} color="#804dee" />
      <pointLight intensity={2} position={[-1, 1.5, 1]} color="#4b42a7" />
      <pointLight intensity={2} position={[-1, 0.5, 1]} color="#804dee" />
      {!isMobile && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          enablePan={false}
          autoRotate={false}
        />
      )}

      {/* Adjust the model's position and scale */}
      <group ref={group} position={[0, -2, 0]} rotation={[0, 0, 0]} scale={1.15}>
      <primitive
          object={scene}
          ref={group}
          rotation={[0, Math.PI, 0]}
          position={isMobile ? [0, -3, 0] : [0, -2, 0]}
          scale={isMobile ? 2 : 4}
        />
      </group>
    </>
  );
}



function PlayerCanvas({ isMobile }) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
      }}
    >
      <Player isMobile={isMobile} />
    </Canvas>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex  text-white overflow-hidden">
  {/* 3D Model Section */}
  <div className="w-1/2 h-screen flex items-center justify-center">
    <PlayerCanvas isMobile={false} />
  </div>

  {/* Content Section */}
  <div className="w-1/2 flex items-center justify-center p-8">
  <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-none text-white">

      <CardHeader>
        <CardTitle className="text-4xl font-bold text-center">Bounty Code</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.p
          className="text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Learn to code with fun challenges!
        </motion.p>

        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <FaCode size={50} className="text-yellow-300" />
          <FaRocket size={50} className="text-red-400" />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            className="w-full bg-purple-500 hover:bg-purple-600 transition-all duration-300 py-6 text-lg font-semibold"
            onClick={() => router.push("/auth/login")}
          >
            Go to Lobby
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent hover:bg-white/20 transition-all duration-300 py-6 text-lg font-semibold"
            onClick={() => router.push("/auth/register")}
          >
            Sign Up
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  </div>
</div>

  );
}