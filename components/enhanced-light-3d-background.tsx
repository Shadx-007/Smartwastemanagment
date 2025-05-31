"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import type * as THREE from "three"

function FloatingCube({
  position,
  color,
  speed,
}: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01
      meshRef.current.rotation.y += speed * 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} wireframe />
    </mesh>
  )
}

function FloatingSphere({
  position,
  color,
  speed,
}: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.008
      meshRef.current.rotation.z += speed * 0.008
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} wireframe />
    </mesh>
  )
}

function SimpleParticles({ theme }: { theme: string }) {
  const pointsRef = useRef<THREE.Points>(null)

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
    }
  })

  const particleColor = theme === "light" ? "#3b82f6" : "#22c55e"

  // Create simple particle positions
  const positions = new Float32Array(300) // 100 particles * 3 coordinates
  for (let i = 0; i < 100; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20 // x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20 // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // z
  }

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={particleColor} transparent opacity={0.6} />
    </points>
  )
}

export function EnhancedLight3DBackground() {
  const { theme } = useTheme()

  const getThemeColors = () => {
    switch (theme) {
      case "light":
        return ["#3b82f6", "#8b5cf6", "#06b6d4"]
      case "ocean":
        return ["#0ea5e9", "#06b6d4", "#3b82f6"]
      case "sunset":
        return ["#f97316", "#fb923c", "#fdba74"]
      case "forest":
        return ["#22c55e", "#16a34a", "#15803d"]
      default:
        return ["#22c55e", "#10b981", "#3b82f6"]
    }
  }

  const colors = getThemeColors()

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />

        <SimpleParticles theme={theme || "dark"} />

        {/* Floating geometric shapes */}
        <FloatingCube position={[-3, 2, -2]} color={colors[0]} speed={1} />
        <FloatingCube position={[4, -1, -3]} color={colors[1]} speed={0.8} />
        <FloatingSphere position={[2, 3, -1]} color={colors[2]} speed={1.2} />
        <FloatingSphere position={[-2, -2, -4]} color={colors[0]} speed={0.9} />
        <FloatingCube position={[0, -3, -2]} color={colors[1]} speed={1.1} />
        <FloatingSphere position={[-4, 1, -3]} color={colors[2]} speed={0.7} />
      </Canvas>
    </div>
  )
}
