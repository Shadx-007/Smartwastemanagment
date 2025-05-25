"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

// Shader for the glowing effect
const glowFragmentShader = `
  varying vec2 vUv;
  uniform vec3 color;
  uniform float intensity;
  
  void main() {
    vec2 uv = vUv;
    float distance = length(uv - 0.5);
    float alpha = smoothstep(0.5, 0.0, distance) * intensity;
    gl_FragColor = vec4(color, alpha);
  }
`

const glowVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Shader for the fire effect
const fireFragmentShader = `
  varying vec2 vUv;
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Create fire-like effect
    float n = noise(uv * 3.0 + time * 0.5);
    n += 0.5 * noise(uv * 6.0 + time * 0.7);
    n += 0.25 * noise(uv * 12.0 + time * 0.9);
    
    // Gradient from bottom to top
    float gradient = 1.0 - uv.y;
    n *= gradient * 1.5;
    
    // Mix colors based on noise
    vec3 color = mix(color1, color2, n);
    
    // Apply alpha for transparency at the edges
    float alpha = smoothstep(0.1, 0.5, n);
    
    gl_FragColor = vec4(color, alpha);
  }
`

const fireVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

function ErdtreeModel() {
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === "dark"
  const groupRef = useRef()
  const [time, setTime] = useState(0)
  const { scene } = useThree()

  // Create a simple tree model since we don't have the actual Erdtree model
  const trunkRef = useRef()
  const leavesRef = useRef()
  const glowRef = useRef()
  const fireRef = useRef()

  // Materials
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: "#5D4037",
    roughness: 0.8,
    metalness: 0.2,
  })

  const leavesMaterial = new THREE.MeshStandardMaterial({
    color: isDarkTheme ? "#FF9800" : "#FFD700",
    roughness: 0.5,
    metalness: 0.3,
    emissive: isDarkTheme ? "#FF4500" : "#FFEB3B",
    emissiveIntensity: isDarkTheme ? 0.5 : 0.3,
  })

  // Glow material (for light mode)
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color("#FFEB3B") },
      intensity: { value: 0.8 },
    },
    vertexShader: glowVertexShader,
    fragmentShader: glowFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
  })

  // Fire material (for dark mode)
  const fireMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#FF4500") },
      color2: { value: new THREE.Color("#FFEB3B") },
    },
    vertexShader: fireVertexShader,
    fragmentShader: fireFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
  })

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }

    // Update time for fire animation
    setTime(state.clock.getElapsedTime())
    if (fireRef.current && fireRef.current.material) {
      fireRef.current.material.uniforms.time.value = state.clock.getElapsedTime()
    }

    // Pulse glow in light mode
    if (glowRef.current && glowRef.current.material && !isDarkTheme) {
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 0.8
      glowRef.current.material.uniforms.intensity.value = pulse
    }
  })

  // Update materials when theme changes
  useEffect(() => {
    if (leavesRef.current) {
      leavesRef.current.material = leavesMaterial
    }

    // Show/hide glow and fire based on theme
    if (glowRef.current) {
      glowRef.current.visible = !isDarkTheme
    }

    if (fireRef.current) {
      fireRef.current.visible = isDarkTheme
    }
  }, [isDarkTheme])

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Trunk */}
      <mesh ref={trunkRef} material={trunkMaterial}>
        <cylinderGeometry args={[0.5, 0.8, 4, 16]} />
      </mesh>

      {/* Branches */}
      <group position={[0, 2, 0]}>
        <mesh material={trunkMaterial}>
          <cylinderGeometry args={[0.3, 0.5, 3, 8]} rotation={[0, 0, Math.PI / 6]} />
        </mesh>
        <mesh material={trunkMaterial} position={[0.5, 0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 2, 8]} rotation={[0, 0, Math.PI / 4]} />
        </mesh>
        <mesh material={trunkMaterial} position={[-0.5, 0.5, 0]}>
          <cylinderGeometry args={[0.2, 0.3, 2, 8]} rotation={[0, 0, -Math.PI / 4]} />
        </mesh>
      </group>

      {/* Leaves/Foliage */}
      <mesh ref={leavesRef} position={[0, 3, 0]} material={leavesMaterial}>
        <sphereGeometry args={[2.5, 32, 32]} />
      </mesh>

      {/* Glow effect (light mode) */}
      <mesh ref={glowRef} position={[0, 3, 0]} material={glowMaterial} visible={!isDarkTheme}>
        <sphereGeometry args={[3, 32, 32]} />
      </mesh>

      {/* Fire effect (dark mode) */}
      <mesh ref={fireRef} position={[0, 3, 0]} material={fireMaterial} visible={isDarkTheme}>
        <sphereGeometry args={[3.2, 32, 32]} />
      </mesh>

      {/* Particles */}
      <Sparkles
        count={100}
        scale={6}
        size={0.6}
        speed={0.3}
        color={isDarkTheme ? "#FF4500" : "#FFEB3B"}
        opacity={0.7}
      />
    </group>
  )
}

export function ErdtreeScene() {
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === "dark"

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={isDarkTheme ? 0.2 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={isDarkTheme ? 0.5 : 1} />
        <pointLight
          position={[0, 5, 0]}
          intensity={isDarkTheme ? 2 : 0.5}
          color={isDarkTheme ? "#FF4500" : "#FFEB3B"}
        />
        <ErdtreeModel />
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
        <Environment preset={isDarkTheme ? "night" : "sunset"} />
      </Canvas>
    </div>
  )
}
