import type { Metadata } from "next"
import { ArrowRight, Brain, Cpu, Database, LineChart, Recycle, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const metadata: Metadata = {
  title: "AI Features - Smart Waste Segregation System",
  description: "Explore our advanced AI capabilities for waste management",
}

export default function AIFeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Waste Management
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
          Our cutting-edge artificial intelligence technology revolutionizes waste segregation with unprecedented
          accuracy and efficiency.
        </p>
        <div className="mx-auto mb-12 h-1 w-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>
      </section>

      {/* AI Features Grid */}
      <section className="mb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <Card className="group overflow-hidden border-green-200/20 transition-all duration-300 hover:shadow-lg dark:border-green-900/20 dark:hover:shadow-emerald-900/10">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-600/5 pb-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <Recycle className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Material Recognition</CardTitle>
              <CardDescription>Identifies materials with 98.7% accuracy using computer vision</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Recognition Accuracy</span>
                  <span className="text-sm font-medium">98.7%</span>
                </div>
                <Progress value={98.7} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Processing Speed</span>
                  <span className="text-sm font-medium">0.3s</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI can identify over 1,500 different types of materials in real-time, even when partially visible or
                damaged.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                98.7% Accuracy
              </Badge>
            </CardFooter>
          </Card>

          {/* Feature 2 */}
          <Card className="group overflow-hidden border-green-200/20 transition-all duration-300 hover:shadow-lg dark:border-green-900/20 dark:hover:shadow-emerald-900/10">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-600/5 pb-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <Brain className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Contamination Detection</CardTitle>
              <CardDescription>Detects and flags contaminated recyclables to improve quality</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Detection Accuracy</span>
                  <span className="text-sm font-medium">96.2%</span>
                </div>
                <Progress value={96.2} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">False Positive Rate</span>
                  <span className="text-sm font-medium">1.8%</span>
                </div>
                <Progress value={18} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Our contamination detection system ensures higher quality recycling streams by identifying food residue,
                hazardous materials, and other contaminants.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                96.2% Accuracy
              </Badge>
            </CardFooter>
          </Card>

          {/* Feature 3 */}
          <Card className="group overflow-hidden border-green-200/20 transition-all duration-300 hover:shadow-lg dark:border-green-900/20 dark:hover:shadow-emerald-900/10">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-600/5 pb-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <LineChart className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Predictive Analytics</CardTitle>
              <CardDescription>Forecasts waste volumes and optimizes collection routes</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Prediction Accuracy</span>
                  <span className="text-sm font-medium">94.5%</span>
                </div>
                <Progress value={94.5} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Route Optimization</span>
                  <span className="text-sm font-medium">27% Improvement</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Our predictive models analyze historical data and seasonal patterns to forecast waste volumes and
                optimize collection schedules and routes.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                27% Efficiency Gain
              </Badge>
            </CardFooter>
          </Card>

          {/* Feature 4 */}
          <Card className="group overflow-hidden border-green-200/20 transition-all duration-300 hover:shadow-lg dark:border-green-900/20 dark:hover:shadow-emerald-900/10">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-600/5 pb-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <Database className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Waste Composition Analysis</CardTitle>
              <CardDescription>Analyzes waste streams to identify recycling opportunities</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Analysis Accuracy</span>
                  <span className="text-sm font-medium">97.3%</span>
                </div>
                <Progress value={97.3} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Material Categories</span>
                  <span className="text-sm font-medium">42 Types</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI breaks down waste composition by material type, identifying opportunities for improved recycling
                and waste reduction strategies.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                42 Material Categories
              </Badge>
            </CardFooter>
          </Card>

          {/* Feature 5 */}
          <Card className="group overflow-hidden border-green-200/20 transition-all duration-300 hover:shadow-lg dark:border-green-900/20 dark:hover:shadow-emerald-900/10">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-600/5 pb-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <Zap className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Real-time Processing</CardTitle>
              <CardDescription>Processes waste items in milliseconds for immediate sorting</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Processing Speed</span>
                  <span className="text-sm font-medium">0.3s per item</span>
                </div>
                <Progress value={92} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Throughput</span>
                  <span className="text-sm font-medium">3,600 items/hour</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Our edge-computing architecture enables real-time processing at the point of disposal, allowing for
                immediate sorting decisions.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                0.3s Response Time
              </Badge>
            </CardFooter>
          </Card>

          {/* Feature 6 */}
          <Card className="group overflow-hidden border-green-200/20 transition-all duration-300 hover:shadow-lg dark:border-green-900/20 dark:hover:shadow-emerald-900/10">
            <CardHeader className="bg-gradient-to-r from-green-500/5 to-emerald-600/5 pb-4">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <Cpu className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Continuous Learning</CardTitle>
              <CardDescription>Self-improving AI that gets better with every interaction</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Learning Rate</span>
                  <span className="text-sm font-medium">0.5% monthly improvement</span>
                </div>
                <Progress value={85} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Model Updates</span>
                  <span className="text-sm font-medium">Weekly</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI continuously learns from new data, adapting to new packaging materials and improving its
                recognition capabilities over time.
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Badge variant="outline" className="border-green-500/30 text-green-500">
                Self-Improving
              </Badge>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="mb-20">
        <h2 className="mb-6 text-center text-3xl font-bold">Technical Architecture</h2>
        <div className="mx-auto mb-10 h-1 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"></div>

        <div className="rounded-xl border border-green-200/20 bg-gradient-to-r from-green-500/5 to-emerald-600/5 p-8 dark:border-green-900/20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Computer Vision</h3>
              <p className="text-sm text-muted-foreground">
                Our custom-trained convolutional neural networks can identify materials from images with 98.7% accuracy,
                even in challenging lighting conditions.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Edge Computing</h3>
              <p className="text-sm text-muted-foreground">
                On-device processing enables real-time decisions without internet connectivity, ensuring the system
                works reliably in all environments.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Cloud Integration</h3>
              <p className="text-sm text-muted-foreground">
                Secure cloud infrastructure aggregates data across all devices, enabling system-wide analytics and
                continuous model improvement.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Transfer Learning</h3>
              <p className="text-sm text-muted-foreground">
                Our models leverage transfer learning from pre-trained networks, allowing rapid adaptation to new waste
                materials and regional variations.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Federated Learning</h3>
              <p className="text-sm text-muted-foreground">
                Privacy-preserving federated learning allows our models to improve without sharing sensitive data,
                maintaining user privacy.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">API Ecosystem</h3>
              <p className="text-sm text-muted-foreground">
                Our comprehensive API allows integration with existing waste management systems, municipal databases,
                and third-party applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-xl border border-green-200/20 bg-gradient-to-r from-green-500/10 to-emerald-600/10 p-8 text-center dark:border-green-900/20">
        <h2 className="mb-4 text-3xl font-bold">Ready to Transform Your Waste Management?</h2>
        <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Join thousands of organizations worldwide that are using Smart Waste's AI technology to reduce waste, increase
          recycling rates, and meet sustainability goals.
        </p>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
          Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>
    </div>
  )
}
