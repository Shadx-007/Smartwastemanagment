"use client"

import { useRef, useEffect, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"

const Stars = () => {
  const starsRef = useRef<THREE.Points>(null)
  const [starPositions, setStarPositions] = useState<Float32Array>(new Float32Array(1000 * 3))

  useEffect(() => {
    const positions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    setStarPositions(positions)
  }, [])

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0005
      starsRef.current.rotation.y += 0.0005
    }
  })

  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <points ref={starsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute attach="attributes-position" array={starPositions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        transparent
        color={isDark ? "#ffffff" : "#94a3b8"}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.1 : 0.08}
      />
    </points>
  )
}

function GeometricShapes() {
  const tetrahedronRef = useRef<THREE.Mesh>(null)
  const cubeRef = useRef<THREE.Mesh>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const octahedronRef = useRef<THREE.Mesh>(null)

  // Theme-aware materials
  const [materials, setMaterials] = useState({
    tetrahedron: new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.1, wireframe: true }),
    cube: new THREE.MeshBasicMaterial({ color: "#cccccc", transparent: true, opacity: 0.08, wireframe: true }),
    sphere: new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.06, wireframe: true }),
    octahedron: new THREE.MeshBasicMaterial({ color: "#eeeeee", transparent: true, opacity: 0.09, wireframe: true }),
  })

  useEffect(() => {
    const updateTheme = () => {
      const isLight = document.documentElement.classList.contains("light")

      setMaterials({
        tetrahedron: new THREE.MeshBasicMaterial({
          color: isLight ? "#64748b" : "#ffffff",
          transparent: true,
          opacity: isLight ? 0.05 : 0.1,
          wireframe: true,
        }),
        cube: new THREE.MeshBasicMaterial({
          color: isLight ? "#64748b" : "#cccccc",
          transparent: true,
          opacity: isLight ? 0.04 : 0.08,
          wireframe: true,
        }),
        sphere: new THREE.MeshBasicMaterial({
          color: isLight ? "#64748b" : "#ffffff",
          transparent: true,
          opacity: isLight ? 0.03 : 0.06,
          wireframe: true,
        }),
        octahedron: new THREE.MeshBasicMaterial({
          color: isLight ? "#64748b" : "#eeeeee",
          transparent: true,
          opacity: isLight ? 0.045 : 0.09,
          wireframe: true,
        }),
      })
    }

    // Initial theme setup
    updateTheme()

    // Listen for theme changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (tetrahedronRef.current) {
      tetrahedronRef.current.rotation.x = time * 0.2
      tetrahedronRef.current.rotation.y = time * 0.3
      tetrahedronRef.current.position.y = Math.sin(time * 0.5) * 2
    }

    if (cubeRef.current) {
      cubeRef.current.rotation.x = time * 0.15
      cubeRef.current.rotation.z = time * 0.25
      cubeRef.current.position.x = Math.cos(time * 0.3) * 3
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.1
      sphereRef.current.position.z = Math.sin(time * 0.4) * 2
    }

    if (octahedronRef.current) {
      octahedronRef.current.rotation.x = time * 0.25
      octahedronRef.current.rotation.y = time * 0.15
      octahedronRef.current.position.x = Math.sin(time * 0.2) * 4
      octahedronRef.current.position.y = Math.cos(time * 0.3) * 2
    }
  })

  return (
    <group>
      {/* Tetrahedron */}
      <mesh ref={tetrahedronRef} position={[8, 5, -10]} material={materials.tetrahedron}>
        <tetrahedronGeometry args={[2]} />
      </mesh>

      {/* Cube */}
      <mesh ref={cubeRef} position={[-6, -3, -8]} material={materials.cube}>
        <boxGeometry args={[2, 2, 2]} />
      </mesh>

      {/* Sphere */}
      <mesh ref={sphereRef} position={[4, -6, -12]} material={materials.sphere}>
        <sphereGeometry args={[1.5, 16, 16]} />
      </mesh>

      {/* Octahedron */}
      <mesh ref={octahedronRef} position={[-8, 8, -15]} material={materials.octahedron}>
        <octahedronGeometry args={[1.8]} />
      </mesh>

      {/* Additional smaller shapes for depth */}
      <mesh position={[12, -8, -20]} rotation={[0.5, 0.5, 0]} material={materials.sphere}>
        <icosahedronGeometry args={[1]} />
      </mesh>

      <mesh position={[-12, 6, -18]} rotation={[1, 0.3, 0.8]} material={materials.cube}>
        <dodecahedronGeometry args={[1.2]} />
      </mesh>
    </group>
  )
}

const ThreeDBackground = () => {
  return (
    <Canvas
      style={{
        background: "transparent",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      <Stars />
      <GeometricShapes />
    </Canvas>
  )
}

export default ThreeDBackground
export { ThreeDBackground }
