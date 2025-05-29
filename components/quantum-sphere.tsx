"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import type * as THREE from "three"

function EcoSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3

      const scale = hovered ? 1.1 : 1 + Math.sin(state.clock.elapsedTime) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[2, 64, 64]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color="#22c55e"
          attach="material"
          distort={0.6}
          speed={3}
          roughness={0.1}
          metalness={0.8}
          emissive="#15803d"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Orbiting particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.5}>
          <Sphere
            args={[0.05, 8, 8]}
            position={[
              Math.cos((i / 20) * Math.PI * 2) * 4,
              Math.sin((i / 10) * Math.PI) * 2,
              Math.sin((i / 20) * Math.PI * 2) * 4,
            ]}
          >
            <meshBasicMaterial color="#22c55e" />
          </Sphere>
        </Float>
      ))}
    </Float>
  )
}

export function QuantumSphere() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#22c55e" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#16a34a" />
        <Environment preset="night" />
        <EcoSphere />
      </Canvas>
    </div>
  )
}
