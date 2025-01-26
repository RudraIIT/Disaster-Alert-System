"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, MapPin } from "lucide-react"

export default function AlertMap() {
  return (
    <div className="h-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Alert Map</h2>
        <Badge variant="outline" className="gap-2">
          <MapPin className="h-4 w-4" />
          Live View
        </Badge>
      </div>
      <div className="relative h-[600px] rounded-lg bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <Card className="w-full max-w-sm mx-4">
            <CardHeader className="space-y-1">
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Map Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is a placeholder for the map integration. In a real application, this would be integrated with a
                mapping service like Google Maps or Mapbox to show real-time alert locations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

