"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particlesPosition = new Float32Array(2000 * 3)
  const particlesColor = new Float32Array(2000 * 3)

  for (let i = 0; i < 2000; i++) {
    particlesPosition[i * 3] = (Math.random() - 0.5) * 100
    particlesPosition[i * 3 + 1] = (Math.random() - 0.5) * 100
    particlesPosition[i * 3 + 2] = (Math.random() - 0.5) * 100

    // Green and gold particles
    const isGreen = Math.random() > 0.5
    if (isGreen) {
      particlesColor[i * 3] = 0.13 // R
      particlesColor[i * 3 + 1] = 0.77 // G
      particlesColor[i * 3 + 2] = 0.37 // B
    } else {
      particlesColor[i * 3] = 0.96 // R
      particlesColor[i * 3 + 1] = 0.62 // G
      particlesColor[i * 3 + 2] = 0.07 // B
    }
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} colors={particlesColor} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  )
}

export function FloatingParticles() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <ParticleField />
      </Canvas>
    </div>
  )
}
