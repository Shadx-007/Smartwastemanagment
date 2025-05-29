"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function RotatingTorus() {
  const torusRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef}>
        <torusGeometry args={[3, 1, 16, 100]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Additional geometric shapes */}
      <mesh position={[6, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[1]} />
        <meshBasicMaterial color="#22c55e" wireframe transparent opacity={0.08} />
      </mesh>

      <mesh position={[-6, 0, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <icosahedronGeometry args={[1.2]} />
        <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

export function AnimatedTorusBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
        <ambientLight intensity={0.2} />
        <RotatingTorus />
      </Canvas>
    </div>
  )
}
