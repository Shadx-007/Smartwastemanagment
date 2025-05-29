"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

// Leaf particle system component
function LeafParticles({ isDark }: { isDark: boolean }) {
  const particlesRef = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array>()
  const [velocities, setVelocities] = useState<Float32Array>()

  useEffect(() => {
    const particleCount = 200
    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      // Position leaves around the tree
      const radius = Math.random() * 8 + 2
      const angle = Math.random() * Math.PI * 2
      const height = Math.random() * 6 + 2

      pos[i3] = Math.cos(angle) * radius
      pos[i3 + 1] = height
      pos[i3 + 2] = Math.sin(angle) * radius

      // Gentle falling motion
      vel[i3] = (Math.random() - 0.5) * 0.02
      vel[i3 + 1] = -Math.random() * 0.01 - 0.005
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02
    }

    setPositions(pos)
    setVelocities(vel)
  }, [])

  useFrame((state) => {
    if (!particlesRef.current || !positions || !velocities) return

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < pos.length; i += 3) {
      // Update positions
      pos[i] += velocities[i]
      pos[i + 1] += velocities[i + 1]
      pos[i + 2] += velocities[i + 2]

      // Reset particles that fall too low
      if (pos[i + 1] < -2) {
        const radius = Math.random() * 8 + 2
        const angle = Math.random() * Math.PI * 2
        pos[i] = Math.cos(angle) * radius
        pos[i + 1] = 8
        pos[i + 2] = Math.sin(angle) * radius
      }

      // Add some wind effect
      velocities[i] += Math.sin(state.clock.elapsedTime + i) * 0.0001
      velocities[i + 2] += Math.cos(state.clock.elapsedTime + i) * 0.0001
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!positions) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={isDark ? "#ff6b35" : "#ffd700"}
        transparent
        opacity={isDark ? 0.8 : 0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Burning effect for dark mode
function BurningEffect() {
  const particlesRef = useRef<THREE.Points>(null)
  const [positions, setPositions] = useState<Float32Array>()

  useEffect(() => {
    const particleCount = 100
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = Math.random() * 6 + 1
      const angle = Math.random() * Math.PI * 2
      const height = Math.random() * 4 + 1

      pos[i3] = Math.cos(angle) * radius
      pos[i3 + 1] = height
      pos[i3 + 2] = Math.sin(angle) * radius
    }

    setPositions(pos)
  }, [])

  useFrame((state) => {
    if (!particlesRef.current || !positions) return

    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < pos.length; i += 3) {
      // Rising smoke/ember effect
      pos[i + 1] += 0.02
      pos[i] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.01
      pos[i + 2] += Math.cos(state.clock.elapsedTime * 2 + i) * 0.01

      // Reset particles that rise too high
      if (pos[i + 1] > 10) {
        const radius = Math.random() * 6 + 1
        const angle = Math.random() * Math.PI * 2
        pos[i] = Math.cos(angle) * radius
        pos[i + 1] = 1
        pos[i + 2] = Math.sin(angle) * radius
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  if (!positions) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ff4500" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// Main tree component
function ErdtreeModel({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null)

  // Load FBX models (simulated since we don't have actual files)
  // In real implementation, you would use:
  // const morningTree = useLoader(FBXLoader, "/Erdtree/erdtree-morning/erdtree-morning.fbx")
  // const nightTree = useLoader(FBXLoader, "/Erdtree/erdtree-night/erdtree-night.fbx")

  // For now, we'll create a procedural tree trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.8, 1.2, 8, 16)
  const branchGeometry = new THREE.CylinderGeometry(0.2, 0.4, 3, 8)

  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: isDark ? "#4a2c2a" : "#8b4513",
    roughness: 0.8,
    metalness: 0.1,
    normalScale: new THREE.Vector2(1, 1),
  })

  const branchMaterial = new THREE.MeshStandardMaterial({
    color: isDark ? "#3a1f1d" : "#654321",
    roughness: 0.9,
    metalness: 0.05,
  })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} position={[0, -2, 0]}>
        {/* Main trunk */}
        <mesh geometry={trunkGeometry} material={trunkMaterial} castShadow receiveShadow />

        {/* Branches */}
        <group position={[0, 3, 0]}>
          <mesh
            geometry={branchGeometry}
            material={branchMaterial}
            position={[1.5, 1, 0]}
            rotation={[0, 0, Math.PI / 4]}
            castShadow
          />
          <mesh
            geometry={branchGeometry}
            material={branchMaterial}
            position={[-1.5, 1, 0]}
            rotation={[0, 0, -Math.PI / 4]}
            castShadow
          />
          <mesh
            geometry={branchGeometry}
            material={branchMaterial}
            position={[0, 1, 1.5]}
            rotation={[Math.PI / 4, 0, 0]}
            castShadow
          />
          <mesh
            geometry={branchGeometry}
            material={branchMaterial}
            position={[0, 1, -1.5]}
            rotation={[-Math.PI / 4, 0, 0]}
            castShadow
          />
        </group>

        {/* Leaf particles */}
        <LeafParticles isDark={isDark} />

        {/* Burning effect for dark mode */}
        {isDark && <BurningEffect />}

        {/* Sparkles for magical effect */}
        <Sparkles count={50} scale={8} size={2} speed={0.4} color={isDark ? "#ff6b35" : "#ffd700"} opacity={0.6} />

        {/* Lighting */}
        <pointLight
          position={[0, 5, 0]}
          intensity={isDark ? 2 : 1}
          color={isDark ? "#ff6b35" : "#ffd700"}
          distance={15}
          decay={2}
        />
      </group>
    </Float>
  )
}

// Loading fallback
function TreeFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b4513" />
    </mesh>
  )
}

// Main component
export function Erdtree3D() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [8, 4, 8], fov: 45 }} shadows dpr={[1, 2]} className="w-full h-full">
        <Suspense fallback={<TreeFallback />}>
          {/* Environment */}
          <Environment preset={isDark ? "night" : "sunset"} />

          {/* Lighting */}
          <ambientLight intensity={isDark ? 0.2 : 0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={isDark ? 0.8 : 1.2}
            color={isDark ? "#ff6b35" : "#ffd700"}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          {/* Fog for atmosphere */}
          <fog attach="fog" args={[isDark ? "#1a0a0a" : "#f5f5dc", 10, 50]} />

          {/* Tree model */}
          <ErdtreeModel isDark={isDark} />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
