"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function FloatingGeometry({ position, geometry, color, speed }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.5
      meshRef.current.rotation.y += speed * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={geometry} />
      <meshBasicMaterial color={color} transparent opacity={0.1} wireframe />
    </mesh>
  )
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 200

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#10b981" transparent opacity={0.3} />
    </points>
  )
}

function AnimatedShapes() {
  const geometries = [
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.SphereGeometry(1.5, 16, 16),
    new THREE.ConeGeometry(1, 2, 8),
    new THREE.OctahedronGeometry(1.5),
    new THREE.TetrahedronGeometry(1.8),
    new THREE.DodecahedronGeometry(1.2),
  ]

  const colors = ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#06b6d4"]

  return (
    <>
      {geometries.map((geometry, index) => (
        <FloatingGeometry
          key={index}
          position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]}
          geometry={geometry}
          color={colors[index % colors.length]}
          speed={0.5 + Math.random() * 0.5}
        />
      ))}
    </>
  )
}

export function Enhanced3DBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <ParticleField />
        <AnimatedShapes />
      </Canvas>
    </div>
  )
}
