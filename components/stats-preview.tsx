"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts"

const data = [
  { name: "Recyclable", value: 45, color: "#3b82f6" },
  { name: "Organic", value: 30, color: "#22c55e" },
  { name: "Hazardous", value: 10, color: "#ef4444" },
  { name: "Electronic", value: 5, color: "#a855f7" },
  { name: "General", value: 10, color: "#64748b" },
]

const mockLogs = [
  { id: 1, time: "10:45 AM", type: "Recyclable", material: "Plastic Bottle", confidence: 95 },
  { id: 2, time: "11:23 AM", type: "Organic", material: "Food Waste", confidence: 88 },
  { id: 3, time: "12:07 PM", type: "Electronic", material: "Battery", confidence: 92 },
  { id: 4, time: "01:15 PM", type: "Recyclable", material: "Aluminum Can", confidence: 97 },
]

export default function StatsPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="md:col-span-2 lg:col-span-1 bg-card/50 backdrop-blur-md border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-cinzel text-xl font-semibold mb-4">Waste Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-md border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-cinzel text-xl font-semibold mb-4">Total Waste Processed</h3>
          <div className="flex flex-col gap-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-primary">18,742</p>
              <p className="text-sm text-muted-foreground mt-2">Items Processed</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">68%</p>
                <p className="text-xs text-muted-foreground mt-1">Recycled</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">24%</p>
                <p className="text-xs text-muted-foreground mt-1">Composted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-500">5%</p>
                <p className="text-xs text-muted-foreground mt-1">Hazardous</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-500">3%</p>
                <p className="text-xs text-muted-foreground mt-1">Landfill</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-md border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-cinzel text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 border-b border-border/50 pb-3">
                <div className="mt-0.5">
                  <div
                    className={`w-3 h-3 rounded-full bg-${log.type === "Recyclable" ? "blue" : log.type === "Organic" ? "green" : log.type === "Electronic" ? "purple" : "gray"}-500`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium truncate">{log.material}</p>
                    <span className="text-xs text-muted-foreground">{log.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {log.type} • {log.confidence}% confidence
                  </p>
                </div>
              </div>
            ))}

            <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors mt-2">
              View All Activity →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
