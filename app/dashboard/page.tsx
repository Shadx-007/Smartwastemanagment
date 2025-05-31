"use client"

import { MassiveExpandedDashboard } from "@/components/massive-expanded-dashboard"
import Enhanced3DRing from "@/components/enhanced-3d-ring"

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      {/* 3D Ring background */}
      <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden z-10">
        <Enhanced3DRing opacity={0.3} color="#3b82f6" scale={1.2} />
      </div>

      {/* Dashboard content */}
      <div className="relative z-20">
        <MassiveExpandedDashboard />
      </div>
    </div>
  )
}
