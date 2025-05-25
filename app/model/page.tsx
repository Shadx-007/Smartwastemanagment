import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ModelPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Hardware Model</h1>
      <p className="text-muted-foreground mb-8">
        Explore the physical implementation of our Smart Waste Segregation System
      </p>

      <Tabs defaultValue="photos" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <Image
                      src={`/placeholder.svg?height=400&width=600&text=Model+Photo+${i}`}
                      alt={`Model photo ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Hardware Component {i}</h3>
                    <p className="text-sm text-muted-foreground">
                      Description of the hardware component and its function in the system.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center p-4">
                      <p className="text-muted-foreground">Video Placeholder {i}</p>
                      <p className="text-sm text-muted-foreground mt-2">(Actual video would be embedded here)</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">System Demonstration {i}</h3>
                    <p className="text-sm text-muted-foreground">
                      Video showing the waste segregation system in action, demonstrating its capabilities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">Hardware Components</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-medium">Sensors:</span>
                  <span className="text-muted-foreground">
                    Infrared, capacitive, and optical sensors for material detection
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Camera:</span>
                  <span className="text-muted-foreground">High-resolution camera for image capture and analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Processor:</span>
                  <span className="text-muted-foreground">Raspberry Pi 4 with 4GB RAM for on-device processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Actuators:</span>
                  <span className="text-muted-foreground">Servo motors for bin selection and material routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Power:</span>
                  <span className="text-muted-foreground">12V DC power supply with battery backup</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-medium mb-4">System Capabilities</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-medium">Classification Accuracy:</span>
                  <span className="text-muted-foreground">Up to 95% accuracy for common waste materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Processing Speed:</span>
                  <span className="text-muted-foreground">1-2 seconds per item for classification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Waste Categories:</span>
                  <span className="text-muted-foreground">
                    Recyclable, organic, hazardous, electronic, and general waste
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Connectivity:</span>
                  <span className="text-muted-foreground">
                    Wi-Fi and Bluetooth for data transmission and remote monitoring
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium">Data Storage:</span>
                  <span className="text-muted-foreground">
                    Local storage with cloud backup for classification history
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
