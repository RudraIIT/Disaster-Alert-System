"use client"

import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import Map from "./map"

export default function AlertMap() {
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Alert Map</h2>
        <Badge variant="outline" className="gap-2">
          <MapPin className="h-4 w-4" />
          Live View
        </Badge>
      </div>
      <Map className="h-full w-full"/>
    </div>
  )
}

