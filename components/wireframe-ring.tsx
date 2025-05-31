interface WireframeRingProps {
  opacity?: number
  className?: string
  scale?: number
}

export function WireframeRing({ opacity = 0.3, className = "", scale = 1.0 }: WireframeRingProps) {
  return (
    <mesh className={className}>
      <ringGeometry args={[0.95, 1, 64]} />
      <meshBasicMaterial color="white" wireframe opacity={opacity} transparent />
    </mesh>
  )
}
