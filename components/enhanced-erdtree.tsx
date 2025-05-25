"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, Sparkles, useTexture, Float, Stars, Cloud } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"

// Shader for the glowing effect
const glowFragmentShader = `
  varying vec2 vUv;
  uniform vec3 color;
  uniform float intensity;
  uniform float time;
  
  void main() {
    vec2 uv = vUv;
    float dist = length(uv - 0.5);
    float ripple = sin(dist * 40.0 - time * 0.5) * 0.02;
    float alpha = smoothstep(0.5, 0.0, dist + ripple) * intensity;
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
  varying vec3 vPosition;
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  
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
  
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
      st += value * 0.1;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    
    // Gradient from bottom to top - higher values at bottom
    float gradient = 1.0 - uv.y;
    
    // Create fire-like effect
    vec2 pos = vec2(uv.x * 3.0, uv.y * 2.0 - time * 0.5);
    float noise1 = fbm(pos);
    float noise2 = fbm(pos * 2.0 + time * 0.2);
    
    // Combine noise and gradient
    float fireIntensity = noise1 * noise2 * gradient * 1.8;
    
    // Apply fire mask (stronger at bottom, fading to top)
    fireIntensity *= pow(gradient, 1.5);
    
    // Color mixing
    vec3 color = mix(color3, color2, smoothstep(0.2, 0.8, fireIntensity));
    color = mix(color, color1, smoothstep(0.4, 1.0, fireIntensity));
    
    // Apply alpha for transparency at the edges
    float alpha = smoothstep(0.05, 0.4, fireIntensity);
    
    // Add flickering
    alpha *= 0.8 + 0.2 * sin(time * 8.0 + uv.y * 20.0);
    
    gl_FragColor = vec4(color, alpha);
  }
`

const fireVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Create a custom environment for the Erdtree
function ErdtreeEnvironment({ isDarkMode }) {
  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.2 : 0.5} />

      {/* Main light */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={isDarkMode ? 0.7 : 1.5}
        color={isDarkMode ? "#FF6A00" : "#FFF6E0"}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light */}
      <pointLight
        position={[-5, 5, -5]}
        intensity={isDarkMode ? 0.3 : 0.7}
        color={isDarkMode ? "#FF4500" : "#FFF9C4"}
      />

      {/* Atmospheric elements */}
      {isDarkMode ? (
        <>
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          <fog attach="fog" args={["#000000", 15, 80]} />
        </>
      ) : (
        <>
          <fog attach="fog" args={["#FFF8E1", 30, 100]} />
          <Cloud position={[0, 15, -5]} opacity={0.5} speed={0.4} width={20} depth={1.5} segments={20} />
        </>
      )}

      {/* Environment preset */}
      <Environment preset={isDarkMode ? "night" : "sunset"} blur={0.8} />
    </>
  )
}

// Advanced Erdtree model with more realistic details
function ErdtreeModel() {
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === "dark"

  const groupRef = useRef()
  const [time, setTime] = useState(0)
  const treeLightsRef = useRef()

  // Use refs for tree components
  const trunkRef = useRef()
  const leavesRef = useRef()
  const glowRef = useRef()
  const fireRef = useRef()
  const sparklesRef = useRef()

  // Point light refs for the tree
  const lightRef1 = useRef()
  const lightRef2 = useRef()
  const lightRef3 = useRef()

  // Debug helpers (only in development)
  // useHelper(lightRef1, PointLightHelper, 0.5, "red")
  // useHelper(lightRef2, PointLightHelper, 0.5, "green")
  // useHelper(lightRef3, PointLightHelper, 0.5, "blue")

  // Load bark texture for the trunk
  const barkTexture = useTexture({
    map: "/placeholder.svg?height=512&width=512&text=Bark+Texture",
  })

  // Create materials
  const trunkMaterial = new THREE.MeshStandardMaterial({
    ...barkTexture,
    roughness: 0.9,
    metalness: 0.1,
    color: "#5D4037",
    emissive: isDarkTheme ? "#FF4500" : "#000000",
    emissiveIntensity: isDarkTheme ? 0.2 : 0,
  })

  const leavesMaterial = new THREE.MeshStandardMaterial({
    color: isDarkTheme ? "#FF9500" : "#FFD700",
    roughness: 0.3,
    metalness: 0.7,
    emissive: isDarkTheme ? "#FF6A00" : "#FFEB3B",
    emissiveIntensity: isDarkTheme ? 0.8 : 0.5,
  })

  // Glow material (for light mode)
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color("#FFEB3B") },
      intensity: { value: 1.0 },
      time: { value: 0 },
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
      color1: { value: new THREE.Color("#FFEB3B") }, // Yellow-white top
      color2: { value: new THREE.Color("#FF6A00") }, // Orange middle
      color3: { value: new THREE.Color("#8B0000") }, // Dark red base
    },
    vertexShader: fireVertexShader,
    fragmentShader: fireFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
  })

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation and movement
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 - 2
    }

    // Update time for animations
    const newTime = state.clock.getElapsedTime()
    setTime(newTime)

    // Update shader uniforms
    if (glowRef.current && glowRef.current.material) {
      glowRef.current.material.uniforms.time.value = newTime
      const pulse = Math.sin(newTime * 0.5) * 0.2 + 0.8
      glowRef.current.material.uniforms.intensity.value = pulse
    }

    if (fireRef.current && fireRef.current.material) {
      fireRef.current.material.uniforms.time.value = newTime
    }

    // Animate point lights in dark mode for flickering fire effect
    if (isDarkTheme) {
      if (lightRef1.current) {
        lightRef1.current.intensity = 2 + Math.sin(newTime * 5) * 0.5
      }
      if (lightRef2.current) {
        lightRef2.current.intensity = 1.5 + Math.sin(newTime * 7 + 1) * 0.3
      }
      if (lightRef3.current) {
        lightRef3.current.intensity = 1 + Math.sin(newTime * 9 + 2) * 0.2
      }
    }
  })

  // Update materials when theme changes
  useEffect(() => {
    if (leavesRef.current) {
      leavesRef.current.material = leavesMaterial
    }
    if (trunkRef.current) {
      trunkRef.current.material = trunkMaterial
    }

    // Show/hide glow and fire based on theme
    if (glowRef.current) {
      glowRef.current.visible = !isDarkTheme
    }
    if (fireRef.current) {
      fireRef.current.visible = isDarkTheme
    }

    // Update tree lights
    if (treeLightsRef.current) {
      const lights = treeLightsRef.current.children
      for (const light of lights) {
        light.color = new THREE.Color(isDarkTheme ? "#FF4500" : "#FFEB3B")
        light.intensity = isDarkTheme ? 2 : 1
      }
    }
  }, [isDarkTheme, leavesMaterial, trunkMaterial])

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -2, 0]}>
        {/* Main trunk */}
        <mesh ref={trunkRef} material={trunkMaterial} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.8, 4, 16]} />
        </mesh>

        {/* Primary branches */}
        <group position={[0, 2, 0]}>
          {/* Center branch */}
          <mesh material={trunkMaterial} castShadow receiveShadow>
            <cylinderGeometry args={[0.3, 0.5, 3, 8]} />
          </mesh>

          {/* Side branches - right */}
          <mesh
            material={trunkMaterial}
            position={[0.5, 0.5, 0]}
            rotation={[0, 0, Math.PI / 4]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
          </mesh>
          <mesh
            material={trunkMaterial}
            position={[1.2, 1.2, 0]}
            rotation={[0, 0, Math.PI / 6]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.1, 0.2, 1.5, 8]} />
          </mesh>

          {/* Side branches - left */}
          <mesh
            material={trunkMaterial}
            position={[-0.5, 0.5, 0]}
            rotation={[0, 0, -Math.PI / 4]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
          </mesh>
          <mesh
            material={trunkMaterial}
            position={[-1.2, 1.2, 0]}
            rotation={[0, 0, -Math.PI / 6]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.1, 0.2, 1.5, 8]} />
          </mesh>

          {/* Back branches */}
          <mesh
            material={trunkMaterial}
            position={[0, 0.5, 0.5]}
            rotation={[Math.PI / 4, 0, 0]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
          </mesh>
          <mesh
            material={trunkMaterial}
            position={[0, 0.5, -0.5]}
            rotation={[-Math.PI / 4, 0, 0]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
          </mesh>
        </group>

        {/* Foliage/Leaves */}
        <mesh ref={leavesRef} position={[0, 4, 0]} material={leavesMaterial} castShadow>
          <sphereGeometry args={[2.5, 32, 32]} />
        </mesh>

        {/* Secondary foliage masses */}
        <mesh position={[1.5, 3, 0]} material={leavesMaterial} castShadow>
          <sphereGeometry args={[1.2, 24, 24]} />
        </mesh>
        <mesh position={[-1.5, 3, 0]} material={leavesMaterial} castShadow>
          <sphereGeometry args={[1.2, 24, 24]} />
        </mesh>
        <mesh position={[0, 3, 1.5]} material={leavesMaterial} castShadow>
          <sphereGeometry args={[1.2, 24, 24]} />
        </mesh>
        <mesh position={[0, 3, -1.5]} material={leavesMaterial} castShadow>
          <sphereGeometry args={[1.2, 24, 24]} />
        </mesh>

        {/* Glow effect (light mode) */}
        <mesh ref={glowRef} position={[0, 3.5, 0]} material={glowMaterial} visible={!isDarkTheme}>
          <sphereGeometry args={[3.5, 32, 32]} />
        </mesh>

        {/* Fire effect (dark mode) */}
        <mesh ref={fireRef} position={[0, 3.5, 0]} material={fireMaterial} visible={isDarkTheme}>
          <sphereGeometry args={[3.8, 32, 32]} />
        </mesh>

        {/* Particle effects */}
        <Sparkles
          ref={sparklesRef}
          count={100}
          scale={6}
          size={0.6}
          speed={0.3}
          color={isDarkTheme ? "#FF4500" : "#FFEB3B"}
          opacity={0.7}
        />

        {/* Additional particle effects for dark mode */}
        {isDarkTheme && (
          <>
            <Sparkles count={50} scale={8} size={0.4} speed={0.8} color="#FF0000" opacity={0.5} />
            <Sparkles position={[0, 5, 0]} count={30} scale={4} size={0.3} speed={2} color="#FFCC00" opacity={0.9} />
          </>
        )}

        {/* Point lights to illuminate the tree */}
        <group ref={treeLightsRef}>
          <pointLight
            ref={lightRef1}
            position={[0, 4, 0]}
            intensity={isDarkTheme ? 2 : 1}
            color={isDarkTheme ? "#FF4500" : "#FFEB3B"}
            distance={10}
            decay={2}
          />
          <pointLight
            ref={lightRef2}
            position={[1.5, 3, 0]}
            intensity={isDarkTheme ? 1.5 : 0.7}
            color={isDarkTheme ? "#FF6A00" : "#FFEB3B"}
            distance={8}
            decay={2}
          />
          <pointLight
            ref={lightRef3}
            position={[-1.5, 3, 0]}
            intensity={isDarkTheme ? 1 : 0.7}
            color={isDarkTheme ? "#FF8800" : "#FFEB3B"}
            distance={8}
            decay={2}
          />
        </group>
      </group>
    </Float>
  )
}

export function EnhancedErdtreeScene() {
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === "dark"

  return (
    <div className="w-full h-full">
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 12], fov: 40 }}
        shadows
        dpr={[1, 2]} // Dynamic pixel ratio for better performance
      >
        <ErdtreeEnvironment isDarkMode={isDarkTheme} />
        <ErdtreeModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
