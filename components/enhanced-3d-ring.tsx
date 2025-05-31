"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

interface Enhanced3DRingProps {
  className?: string
  opacity?: number
  color?: string
  position?: [number, number, number]
  scale?: number
  rotationSpeed?: number
  height?: string
}

export default function Enhanced3DRing({
  className = "",
  opacity = 0.6,
  color = "#d4af37", // Gold color
  position = [0, 0, 0],
  scale = 0.8,
  rotationSpeed = 0.001,
  height = "400px",
}: Enhanced3DRingProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 4

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0) // Transparent background
    containerRef.current.appendChild(renderer.domElement)

    // Create torus geometry
    const torusGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100)

    // Create wireframe material
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: opacity,
    })

    // Create mesh
    const torus = new THREE.Mesh(torusGeometry, wireframeMaterial)
    torus.position.set(position[0], position[1], position[2])
    torus.scale.set(scale, scale, scale)
    scene.add(torus)

    // Create a second, larger torus for more complexity
    const outerTorusGeometry = new THREE.TorusGeometry(2.5, 0.15, 16, 100)
    const outerTorus = new THREE.Mesh(outerTorusGeometry, wireframeMaterial)
    outerTorus.rotation.x = Math.PI / 4
    outerTorus.position.set(position[0], position[1], position[2])
    outerTorus.scale.set(scale, scale, scale)
    scene.add(outerTorus)

    // Create a third, smaller torus
    const innerTorusGeometry = new THREE.TorusGeometry(1.5, 0.2, 16, 80)
    const innerTorus = new THREE.Mesh(innerTorusGeometry, wireframeMaterial)
    innerTorus.rotation.y = Math.PI / 3
    innerTorus.position.set(position[0], position[1], position[2])
    innerTorus.scale.set(scale, scale, scale)
    scene.add(innerTorus)

    // Add some particles for a more dynamic effect
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a sphere of particles
      const angle1 = Math.random() * Math.PI * 2
      const angle2 = Math.random() * Math.PI * 2
      const radius = 2 + (Math.random() - 0.5) * 1.5

      posArray[i * 3] = Math.cos(angle1) * Math.sin(angle2) * radius
      posArray[i * 3 + 1] = Math.sin(angle1) * Math.sin(angle2) * radius
      posArray[i * 3 + 2] = Math.cos(angle2) * radius
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(color),
      transparent: true,
      opacity: opacity * 0.7,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    particlesMesh.position.set(position[0], position[1], position[2])
    particlesMesh.scale.set(scale, scale, scale)
    scene.add(particlesMesh)

    // Handle window resize
    const handleResize = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth
      const height = containerRef.current?.clientHeight || window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Call once to set initial size

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the toruses
      torus.rotation.x += rotationSpeed
      torus.rotation.y += rotationSpeed * 0.8

      outerTorus.rotation.x += rotationSpeed * 0.5
      outerTorus.rotation.z += rotationSpeed * 0.7

      innerTorus.rotation.y += rotationSpeed * 1.2
      innerTorus.rotation.z += rotationSpeed * 0.9

      // Rotate the particles slightly
      particlesMesh.rotation.y += rotationSpeed * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose geometries and materials
      torusGeometry.dispose()
      outerTorusGeometry.dispose()
      innerTorusGeometry.dispose()
      particlesGeometry.dispose()
      wireframeMaterial.dispose()
      particlesMaterial.dispose()
    }
  }, [opacity, color, position, scale, rotationSpeed])

  return (
    <div style={{ position: "relative", height: height, width: "100%" }}>
      <div ref={containerRef} className={`absolute inset-0 pointer-events-none z-0 ${className}`} />
    </div>
  )
}
