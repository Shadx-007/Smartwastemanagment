"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import type * as THREE from "three"

function WasteModel({
  position,
  type,
  rotationSpeed,
}: { position: [number, number, number]; type: string; rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.5
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  const getColor = () => {
    switch (type) {
      case "organic":
        return "#22c55e"
      case "plastic":
        return "#3b82f6"
      case "e-waste":
        return "#ef4444"
      default:
        return "#64748b"
    }
  }

  const getGeometry = () => {
    switch (type) {
      case "organic":
        return <sphereGeometry args={[0.3, 8, 8]} />
      case "plastic":
        return <boxGeometry args={[0.4, 0.4, 0.4]} />
      case "e-waste":
        return <octahedronGeometry args={[0.35]} />
      default:
        return <sphereGeometry args={[0.3, 8, 8]} />
    }
  }

  return (
    <mesh ref={meshRef} position={position}>
      {getGeometry()}
      <meshStandardMaterial color={getColor()} transparent opacity={0.15} wireframe />
    </mesh>
  )
}

function FloatingWasteScene({ types, rotationSpeed }: { types: string[]; rotationSpeed: number }) {
  const { theme } = useTheme()

  const models = types.flatMap((type, typeIndex) =>
    Array.from({ length: 3 }, (_, i) => ({
      type,
      position: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4] as [
        number,
        number,
        number,
      ],
      key: `${type}-${typeIndex}-${i}`,
    })),
  )

  return (
    <>
      <ambientLight intensity={theme === "light" ? 0.3 : 0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.3} />
      {models.map((model) => (
        <WasteModel key={model.key} position={model.position} type={model.type} rotationSpeed={rotationSpeed} />
      ))}
    </>
  )
}

export default function FloatingWasteModels({
  types = ["organic", "plastic", "e-waste"],
  opacity = 0.15,
  rotationSpeed = 0.002,
}: {
  types?: string[]
  opacity?: number
  rotationSpeed?: number
}) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <FloatingWasteScene types={types} rotationSpeed={rotationSpeed} />
      </Canvas>
    </div>
  )
}
