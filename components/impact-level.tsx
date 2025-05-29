// components/impact-level.tsx
"use client"
import { useEffect, useState } from "react"

export default function ImpactLevel() {
  const [impact, setImpact] = useState(0)

  useEffect(() => {
    setImpact(Math.floor(Math.random() * 20) + 80)
  }, [])

  return <span className="text-green-400 font-medium">{impact}%</span>
}
