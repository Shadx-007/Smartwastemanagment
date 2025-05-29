"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Torus, Box, Cylinder } from "@react-three/drei"
import type * as THREE from "three"

function WasteClassificationVisual() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central AI Brain */}
      <Sphere args={[2.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} transparent opacity={0.8} />
      </Sphere>

      {/* Orbiting Waste Items */}
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          {/* Recyclable Items */}
          <Box args={[0.5, 0.5, 0.5]} position={[5, 0, 0]}>
            <meshStandardMaterial
              color={i % 2 === 0 ? "#f59e0b" : "#22c55e"}
              emissive={i % 2 === 0 ? "#f59e0b" : "#22c55e"}
              emissiveIntensity={0.2}
            />
          </Box>
        </group>
      ))}

      {/* Classification Rings */}
      <Torus args={[4, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.5} />
      </Torus>

      <Torus args={[6, 0.1]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
      </Torus>

      {/* Data Streams */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 8
        return (
          <Cylinder
            key={i}
            args={[0.05, 0.05, 1]}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(useFrame as any) * 2]}
            rotation={[0, 0, angle]}
          >
            <meshStandardMaterial
              color={i % 2 === 0 ? "#22c55e" : "#f59e0b"}
              emissive={i % 2 === 0 ? "#22c55e" : "#f59e0b"}
              emissiveIntensity={0.8}
            />
          </Cylinder>
        )
      })}
    </group>
  )
}

export function HeroVisual3D() {
  return (
    <div className="relative w-full h-full">
      {/* Glassmorphic Container */}
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-green-500/10 to-amber-500/10 backdrop-blur-xl border border-green-500/20 shadow-2xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#22c55e" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
          <spotLight position={[0, 10, 0]} intensity={0.8} color="#10b981" />

          <WasteClassificationVisual />
        </Canvas>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-green-500/30">
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI Classification Active
        </div>
      </div>

      <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-amber-500/30">
        <div className="text-amber-400 text-sm font-medium">98.7% Accuracy</div>
        <div className="text-gray-400 text-xs">Real-time Processing</div>
      </div>

      <div className="absolute top-1/2 left-8 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-green-500/30">
        <div className="text-green-400 text-sm font-medium">50K+ Items</div>
        <div className="text-gray-400 text-xs">Processed Today</div>
      </div>

      {/* Glow Effects */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/5 to-amber-500/5 blur-xl" />
    </div>
  )
}
