"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    const colors = new Float32Array(3000 * 3)

    for (let i = 0; i < 3000; i++) {
      // Create organic, flowing patterns
      const radius = Math.random() * 25 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Color variation between green and gold
      const colorChoice = Math.random()
      if (colorChoice > 0.7) {
        // Gold particles
        colors[i * 3] = 1.0 // R
        colors[i * 3 + 1] = 0.8 // G
        colors[i * 3 + 2] = 0.2 // B
      } else {
        // Green particles
        colors[i * 3] = 0.2 // R
        colors[i * 3 + 1] = 1.0 // G
        colors[i * 3 + 2] = 0.4 // B
      }
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition[0]} colors={particlesPosition[1]} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  )
}

function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating geometric shapes */}
      <mesh position={[10, 5, -5]}>
        <octahedronGeometry args={[1]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.3} wireframe />
      </mesh>

      <mesh position={[-8, -3, -8]}>
        <icosahedronGeometry args={[1.5]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.2} wireframe />
      </mesh>

      <mesh position={[5, -8, -3]}>
        <tetrahedronGeometry args={[1.2]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.25} wireframe />
      </mesh>
    </group>
  )
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {/* CSS Background Patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(245,158,11,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      {/* Circuit-like patterns */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10h80v80h-80z" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="2" fill="rgba(245,158,11,0.6)" />
              <circle cx="90" cy="10" r="2" fill="rgba(34,197,94,0.6)" />
              <circle cx="10" cy="90" r="2" fill="rgba(16,185,129,0.6)" />
              <circle cx="90" cy="90" r="2" fill="rgba(245,158,11,0.6)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }} style={{ position: "absolute", inset: 0 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#22c55e" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f59e0b" />

        <FloatingParticles />
        <GeometricShapes />
      </Canvas>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/90" />
    </div>
  )
}
