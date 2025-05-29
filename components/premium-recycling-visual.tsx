"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Torus, Box, Cylinder } from "@react-three/drei"
import type * as THREE from "three"

function RecyclingSymbol() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central sphere representing Earth */}
      <Sphere args={[2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} transparent opacity={0.8} />
      </Sphere>

      {/* Orbiting recycling elements */}
      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
          <Torus args={[0.5, 0.1]} position={[4, 0, 0]}>
            <meshStandardMaterial
              color={i === 0 ? "#f59e0b" : i === 1 ? "#22c55e" : "#10b981"}
              emissive={i === 0 ? "#f59e0b" : i === 1 ? "#22c55e" : "#10b981"}
              emissiveIntensity={0.3}
            />
          </Torus>
        </group>
      ))}

      {/* Floating waste items */}
      <Box args={[0.3, 0.3, 0.3]} position={[3, 2, 1]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} />
      </Box>

      <Cylinder args={[0.2, 0.2, 0.6]} position={[-3, -1, 2]}>
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} />
      </Cylinder>

      <Sphere args={[0.25]} position={[2, -3, -1]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
      </Sphere>
    </group>
  )
}

function AINetworkNodes() {
  const nodesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={nodesRef}>
      {/* AI network visualization */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 6
        return (
          <Sphere
            key={i}
            args={[0.1]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              Math.sin((useFrame as any).clock?.elapsedTime * 0.5 + i) * 0.5,
            ]}
          >
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
          </Sphere>
        )
      })}
    </group>
  )
}

export function PremiumRecyclingVisual() {
  return (
    <div className="relative w-full h-full">
      {/* Glassmorphic container */}
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-green-500/10 to-amber-500/10 backdrop-blur-xl border border-green-500/20 shadow-2xl">
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} style={{ width: "100%", height: "100%" }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#22c55e" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f59e0b" />
          <spotLight position={[0, 10, 0]} intensity={0.8} color="#10b981" />

          <RecyclingSymbol />
          <AINetworkNodes />
        </Canvas>
      </div>

      {/* Floating UI elements */}
      <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-green-500/30">
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI Processing Active
        </div>
      </div>

      <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-amber-500/30">
        <div className="text-amber-400 text-sm font-medium">98.7% Accuracy</div>
        <div className="text-gray-400 text-xs">Real-time Classification</div>
      </div>

      {/* Glow effects */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-500/5 to-amber-500/5 blur-xl" />
    </div>
  )
}
