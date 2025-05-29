"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { MissionSection } from "@/components/sections/mission-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { DashboardPreviewSection } from "@/components/sections/dashboard-preview-section"
import { EcoImpactSection } from "@/components/sections/eco-impact-section"
import { TeamTechnologySection } from "@/components/sections/team-technology-section"
import { CallToActionSection } from "@/components/sections/call-to-action-section"
import { SystemMonitoringSidebar } from "@/components/system-monitoring-sidebar"
import { FloatingParticles } from "@/components/floating-particles"
import { ExtendedContentSections } from "@/components/extended-content-sections"
import { ThreeDBackground } from "@/components/three-d-background"

export default function HomePage() {
  return (
    <div className="relative bg-black overflow-x-hidden min-h-[3000px]">
      {/* 3D Animated Background */}
      <ThreeDBackground />

      {/* System Monitoring Sidebar */}
      <SystemMonitoringSidebar />

      {/* Floating Background Particles */}
      <FloatingParticles />

      {/* Main Content - No gaps between sections */}
      <main className="relative z-10">
        <HeroSection />
        <MissionSection />
        <HowItWorksSection />
        <DashboardPreviewSection />
        <EcoImpactSection />
        <TeamTechnologySection />
        <ExtendedContentSections />
        <CallToActionSection />
      </main>
    </div>
  )
}
