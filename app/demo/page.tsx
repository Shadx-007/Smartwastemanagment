import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Recycle, BarChart3, Camera, Upload, Clock, Award } from "lucide-react"

export default function DemoPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Experience Smart Waste Segregation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See our AI-powered waste segregation system in action with interactive demos and real-world examples.
          </p>
        </div>

        {/* Hero Demo Section */}
        <div className="relative rounded-xl overflow-hidden mb-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4" variant="outline">
                Live Demo
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Try Our AI Waste Classifier</h2>
              <p className="text-muted-foreground mb-6">
                Upload an image of waste and our AI will instantly classify it into the correct category. See how our
                technology works in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Use Camera
                </Button>
              </div>
            </div>
            <div className="bg-card rounded-xl border shadow-sm p-6 relative">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Upload an image or use your camera to see the AI in action</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">Classification Results:</p>
                <p className="text-muted-foreground text-sm">Results will appear here after processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Demo Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Real-time Classification",
                description: "See instant waste classification with 95% accuracy using our advanced AI model",
                icon: Clock,
              },
              {
                title: "Multi-category Detection",
                description: "Identifies recyclables, organic waste, e-waste, hazardous materials, and more",
                icon: Recycle,
              },
              {
                title: "Performance Metrics",
                description: "View detailed analytics on classification accuracy and environmental impact",
                icon: BarChart3,
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Case Studies</h2>
          <Tabs defaultValue="municipal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="municipal">Municipal</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="educational">Educational</TabsTrigger>
            </TabsList>
            <TabsContent value="municipal" className="border rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">City of Greenville Implementation</h3>
                  <p className="text-muted-foreground mb-4">
                    The City of Greenville implemented our smart waste segregation system across 50 collection points,
                    resulting in a 40% increase in recycling rates and 30% reduction in landfill waste.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "40% increase in recycling rates",
                      "30% reduction in landfill waste",
                      "$120,000 annual savings in waste management costs",
                      "15% decrease in carbon emissions",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="gap-2">
                    Read Full Case Study <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-muted rounded-xl aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground">Case study visualization</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="commercial" className="border rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">EcoRetail Shopping Center</h3>
                  <p className="text-muted-foreground mb-4">
                    EcoRetail implemented our system across their 25-store shopping center, achieving 60% waste
                    diversion and significant cost savings on waste disposal.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "60% waste diversion rate",
                      "35% reduction in waste management costs",
                      "Improved customer satisfaction scores",
                      "Achieved sustainability certification",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="gap-2">
                    Read Full Case Study <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-muted rounded-xl aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground">Case study visualization</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="educational" className="border rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Green University Campus</h3>
                  <p className="text-muted-foreground mb-4">
                    Green University deployed our system across their campus, engaging students in sustainability
                    efforts and achieving a 70% recycling rate.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "70% recycling rate achieved",
                      "50% student engagement in sustainability programs",
                      "Used as educational tool in environmental studies",
                      "Won campus sustainability award",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="gap-2">
                    Read Full Case Study <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-muted rounded-xl aspect-video flex items-center justify-center">
                  <p className="text-muted-foreground">Case study visualization</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The AI accuracy is impressive. We've seen a 45% improvement in our waste sorting efficiency since implementation.",
                author: "Sarah Johnson",
                role: "Sustainability Director, EcoTech Industries",
              },
              {
                quote:
                  "This system has transformed our municipal waste management. The real-time analytics help us make data-driven decisions.",
                author: "Michael Chen",
                role: "City Waste Management Lead",
              },
              {
                quote:
                  "Our students love the interactive nature of the system. It's made sustainability education engaging and measurable.",
                author: "Dr. Emily Rodriguez",
                role: "Environmental Science Professor",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="italic mb-6">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-xl bg-primary/5 p-8 text-center">
          <div className="mx-auto max-w-2xl">
            <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Ready to see the impact?</h2>
            <p className="text-xl text-muted-foreground mb-6">
              Schedule a personalized demo with our team to see how our smart waste segregation system can transform
              your waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Schedule Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
