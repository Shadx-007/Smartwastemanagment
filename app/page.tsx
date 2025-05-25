import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { ErdtreeVisualization } from "@/components/erdtree-visualization"
import {
  Recycle,
  Leaf,
  BarChart3,
  Shield,
  Cpu,
  Users,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Building,
  Globe,
  ChevronRight,
  CheckCircle2,
  BarChart4,
  PieChart,
  LineChart,
} from "lucide-react"

const features = [
  {
    icon: Recycle,
    title: "Smart Waste Classification",
    description:
      "AI-powered image recognition classifies waste into 15+ categories with 98% accuracy using advanced computer vision.",
    stats: "98% Accuracy",
  },
  {
    icon: Cpu,
    title: "IoT-Based Detection",
    description: "Real-time sensors detect material composition, weight, and contamination levels for precise sorting.",
    stats: "Real-time Processing",
  },
  {
    icon: Shield,
    title: "Blockchain Tracking",
    description: "Immutable ledger tracks waste journey from collection to processing, ensuring transparency.",
    stats: "100% Traceable",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics Dashboard",
    description: "Comprehensive analytics providing insights into waste patterns and optimization recommendations.",
    stats: "Live Analytics",
  },
  {
    icon: Leaf,
    title: "Carbon Credit Calculation",
    description: "Automatically calculate carbon credits based on recycling and waste reduction activities.",
    stats: "Verified Credits",
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Gamified mobile app encouraging community participation through challenges and rewards.",
    stats: "10K+ Users",
  },
]

const stats = [
  { value: "98%", label: "Classification Accuracy" },
  { value: "50K+", label: "Items Processed Daily" },
  { value: "68%", label: "Waste Diverted" },
  { value: "2.3M", label: "CO₂ Tons Reduced" },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Sustainability Director",
    company: "EcoTech Solutions",
    content: "This system transformed our waste management. We've seen a 45% increase in recycling efficiency.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Operations Manager",
    company: "GreenCity Municipality",
    content: "The AI classification is incredibly accurate. Our contamination rates dropped by 60%.",
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    role: "Environmental Scientist",
    company: "Climate Research Institute",
    content: "The carbon credit tracking feature provides verified, actionable sustainability metrics.",
    rating: 5,
  },
]

const successStories = [
  {
    name: "GreenCity Municipality",
    logo: "/placeholder.svg?height=80&width=80&text=GC",
    stats: [
      { label: "Waste Diverted", value: "68%" },
      { label: "Cost Savings", value: "$1.2M" },
      { label: "CO₂ Reduction", value: "450 tons" },
    ],
    quote:
      "Implementing Smart Waste has revolutionized our city's approach to waste management. We've seen dramatic improvements in recycling rates and significant cost savings.",
    person: "Mayor James Wilson",
  },
  {
    name: "EcoTech Industries",
    logo: "/placeholder.svg?height=80&width=80&text=ET",
    stats: [
      { label: "Processing Efficiency", value: "+42%" },
      { label: "Error Reduction", value: "87%" },
      { label: "ROI", value: "315%" },
    ],
    quote:
      "The AI-powered classification system has dramatically improved our sorting accuracy and processing efficiency. The ROI has exceeded our expectations.",
    person: "Dr. Lisa Chen, Operations Director",
  },
  {
    name: "Sustainable Campus Initiative",
    logo: "/placeholder.svg?height=80&width=80&text=SC",
    stats: [
      { label: "Student Engagement", value: "12,500+" },
      { label: "Waste Reduction", value: "52%" },
      { label: "Awards Won", value: "3" },
    ],
    quote:
      "Our university has become a model for sustainable waste management. The gamification elements have driven incredible student participation.",
    person: "Prof. Michael Brown, Sustainability Chair",
  },
]

const partners = [
  { name: "TechCorp", logo: "/placeholder.svg?height=60&width=120&text=TechCorp" },
  { name: "GreenFuture", logo: "/placeholder.svg?height=60&width=120&text=GreenFuture" },
  { name: "EcoSolutions", logo: "/placeholder.svg?height=60&width=120&text=EcoSolutions" },
  { name: "SustainTech", logo: "/placeholder.svg?height=60&width=120&text=SustainTech" },
  { name: "RecycleNow", logo: "/placeholder.svg?height=60&width=120&text=RecycleNow" },
  { name: "CleanEarth", logo: "/placeholder.svg?height=60&width=120&text=CleanEarth" },
]

const impactMetrics = [
  {
    title: "Waste Diverted from Landfills",
    value: "1.2M tons",
    change: "+24% YoY",
    trend: "up",
  },
  {
    title: "CO₂ Emissions Prevented",
    value: "2.3M tons",
    change: "+32% YoY",
    trend: "up",
  },
  {
    title: "Organizations Using Platform",
    value: "450+",
    change: "+65% YoY",
    trend: "up",
  },
  {
    title: "Average Recycling Improvement",
    value: "42%",
    change: "+8% YoY",
    trend: "up",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  🌱 Powered by AI & Blockchain
                </Badge>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                    AI-powered
                  </span>
                  <br />
                  Waste Segregation
                  <br />
                  <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">for a Cleaner Planet</span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl">
                  Revolutionary waste management system built with IoT sensors, Machine Learning, and Blockchain
                  technology. Achieve 98% classification accuracy while reducing carbon footprint by 68%.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  asChild
                >
                  <Link href="/features" className="flex items-center gap-2">
                    Explore Features
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/demo">Try Demo</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <ErdtreeVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionary Waste Management Technology</h2>
            <p className="text-xl text-muted-foreground">
              Our comprehensive platform combines cutting-edge AI, IoT sensors, and blockchain technology to create the
              most advanced waste segregation system available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Global Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Measurable Difference</h2>
            <p className="text-xl text-muted-foreground">
              Our platform is creating real environmental impact across organizations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric) => (
              <Card key={metric.title} className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold">{metric.value}</span>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                        {metric.change}
                      </span>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                      ) : (
                        <TrendingUp className="h-4 w-4 ml-1 text-red-500 transform rotate-180" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-muted/30 rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Environmental Impact Visualization</h3>
                <p className="text-muted-foreground mb-6">
                  Our platform tracks and visualizes the environmental impact of waste management improvements across
                  all partner organizations.
                </p>
                <div className="space-y-4">
                  {[
                    "Carbon footprint reduction tracking",
                    "Landfill diversion metrics",
                    "Recycling efficiency improvements",
                    "Resource conservation calculations",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-md">
                <Tabs defaultValue="carbon">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="carbon">Carbon</TabsTrigger>
                    <TabsTrigger value="waste">Waste</TabsTrigger>
                    <TabsTrigger value="recycling">Recycling</TabsTrigger>
                  </TabsList>
                  <TabsContent value="carbon" className="mt-4">
                    <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <LineChart className="h-32 w-32 text-green-500/20" />
                      </div>
                      <div className="relative z-10 text-center p-4">
                        <h4 className="text-lg font-semibold mb-2">Carbon Reduction Trend</h4>
                        <p className="text-sm text-muted-foreground mb-4">Tracking CO₂ emissions prevented</p>
                        <div className="text-3xl font-bold text-green-500">2.3M tons</div>
                        <p className="text-sm text-muted-foreground mt-2">32% increase year-over-year</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="waste" className="mt-4">
                    <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BarChart4 className="h-32 w-32 text-blue-500/20" />
                      </div>
                      <div className="relative z-10 text-center p-4">
                        <h4 className="text-lg font-semibold mb-2">Waste Diversion</h4>
                        <p className="text-sm text-muted-foreground mb-4">Tracking waste diverted from landfills</p>
                        <div className="text-3xl font-bold text-blue-500">1.2M tons</div>
                        <p className="text-sm text-muted-foreground mt-2">24% increase year-over-year</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="recycling" className="mt-4">
                    <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <PieChart className="h-32 w-32 text-purple-500/20" />
                      </div>
                      <div className="relative z-10 text-center p-4">
                        <h4 className="text-lg font-semibold mb-2">Recycling Efficiency</h4>
                        <p className="text-sm text-muted-foreground mb-4">Average improvement across organizations</p>
                        <div className="text-3xl font-bold text-purple-500">42%</div>
                        <p className="text-sm text-muted-foreground mt-2">8% increase year-over-year</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Waste Management Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See how organizations are achieving remarkable results with our AI-powered waste segregation system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.name} className="overflow-hidden border-0 shadow-lg">
                <CardHeader className="pb-2 border-b">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
                      <Image src={story.logo || "/placeholder.svg"} alt={story.name} fill className="object-cover" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{story.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {story.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-lg font-bold text-primary">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm italic mb-4">"{story.quote}"</p>
                  <p className="text-sm font-medium">— {story.person}</p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" size="sm" className="ml-auto" asChild>
                    <Link href="/case-studies" className="flex items-center gap-1">
                      Read full case study
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Our Partners
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-muted-foreground">
              We collaborate with forward-thinking organizations committed to sustainability.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center">
                <div className="relative h-16 w-32">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              See how organizations worldwide are transforming their waste management with our AI-powered solution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className="border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Recognition
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Award-Winning Technology</h2>
            <p className="text-xl text-muted-foreground">
              Our innovative approach to waste management has been recognized by leading industry organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                award: "Sustainability Innovation Award",
                organization: "Global Green Tech Summit",
                year: "2023",
                icon: Award,
              },
              {
                award: "Best AI Application",
                organization: "International AI Awards",
                year: "2023",
                icon: Cpu,
              },
              {
                award: "Environmental Impact Award",
                organization: "Climate Action Forum",
                year: "2022",
                icon: Leaf,
              },
              {
                award: "Smart City Solution",
                organization: "Urban Tech Alliance",
                year: "2022",
                icon: Building,
              },
            ].map((item) => (
              <Card key={item.award} className="text-center border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.award}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{item.organization}</p>
                  <p className="text-xs text-primary">{item.year}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Map */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">
              Global Reach
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making an Impact Worldwide</h2>
            <p className="text-xl text-muted-foreground">
              Our technology is deployed across 28 countries, helping organizations around the world improve their waste
              management.
            </p>
          </div>

          <div className="relative h-[400px] bg-muted rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="h-64 w-64 text-primary/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg max-w-md">
                <h3 className="text-xl font-bold mb-2">Global Deployment</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">28</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">450+</div>
                    <div className="text-sm text-muted-foreground">Organizations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1,200+</div>
                    <div className="text-sm text-muted-foreground">Installations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3.5M+</div>
                    <div className="text-sm text-muted-foreground">Users</div>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/about">Learn More About Our Global Impact</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Waste Management?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of organizations already using our AI-powered waste segregation system to reduce
              environmental impact and increase recycling efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/demo">Try Free Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
