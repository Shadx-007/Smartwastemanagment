"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useTheme } from "next-themes"

function Optimized3DBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const material = useMemo(() => {
    const isLight = typeof window !== "undefined" && document.documentElement.classList.contains("light")

    return new THREE.MeshStandardMaterial({
      color: isLight ? "#64748b" : "#ffffff",
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.05 : 0.1,
      metalness: 0.8,
      roughness: 0.2,
    })
  }, [])

  // Add theme change listener
  useEffect(() => {
    const handleThemeChange = () => {
      if (material) {
        const isLight = document.documentElement.classList.contains("light")
        material.color.setStyle(isLight ? "#64748b" : "#ffffff")
        material.opacity = isLight ? 0.05 : 0.1
      }
    }

    // Listen for class changes on documentElement
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [material])

  // Update the particle colors
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    const colors = new Float32Array(200 * 3)

    for (let i = 0; i < 200; i++) {
      const radius = 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      if (isDark) {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      } else {
        colors[i * 3] = 0.58 // #94a3b8 normalized
        colors[i * 3 + 1] = 0.64
        colors[i * 3 + 2] = 0.72
      }
    }

    return [positions, colors]
  }, [isDark])

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
    }
  })

  return (
    <group>
      <mesh ref={meshRef} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <primitive object={material} attach="material" />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute attach="attributes-position" array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} vertexColors transparent opacity={isDark ? 0.15 : 0.08} sizeAttenuation={false} />
      </points>
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.5 : 0.3} color={isDark ? "#ffffff" : "#94a3b8"} />
    </group>
  )
}

export default function Optimized3DBackgroundCanvas() {
  return (
    <Canvas
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
      camera={{ position: [0, 0, 5] }}
    >
      <Optimized3DBackground />
    </Canvas>
  )
}
