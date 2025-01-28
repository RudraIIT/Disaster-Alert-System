"use client"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, CloudRain, Flame, Waves } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios'

// const alerts = [
//   {
//     id: 1,
//     title: "Flash Flood Warning",
//     description: "Heavy rainfall causing flash floods in downtown area. Seek higher ground immediately.",
//     severity: "high",
//     type: "flood",
//     time: "2 minutes ago",
//     region: "Downtown",
//   },
//   {
//     id: 2,
//     title: "Severe Thunderstorm",
//     description: "Strong winds and lightning expected. Stay indoors and away from windows.",
//     severity: "medium",
//     type: "weather",
//     time: "10 minutes ago",
//     region: "Metropolitan Area",
//   },
//   {
//     id: 3,
//     title: "Wildfire Alert",
//     description: "Rapidly spreading wildfire in northern forest area. Evacuation orders in effect.",
//     severity: "high",
//     type: "fire",
//     time: "15 minutes ago",
//     region: "North Forest",
//   },
// ]

type Alert = {
  id: number
  title: string
  description: string
  severity: string
  type: string
  time: string
  region: string
}

const getAlertIcon = (type: string) => {
  switch (type) {
    case "flood":
      return <Waves className="h-4 w-4" />
    case "weather":
      return <CloudRain className="h-4 w-4" />
    case "fire":
      return <Flame className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-destructive text-destructive-foreground"
    case "medium":
      return "bg-warning text-warning-foreground"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function AlertFeed() {
  const [alerts_arr, setAlerts_arr] = useState<Alert[]>([]);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notifications');
        console.log(response);
        setAlerts_arr(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    getNotifications();
  },[alerts_arr.length]);

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Active Alerts</h2>
        <Badge variant="outline">{alerts_arr.length} Active</Badge>
      </div>
      <ScrollArea className="h-[600px]">
        <div className="p-4 space-y-4">
          {alerts_arr.length === 0 && (
            <div className="text-muted-foreground text-center text-2xl">
              No alerts to display
            </div>
          )}
          {alerts_arr.length > 0 && alerts_arr.map((alert) => (
            <Alert key={alert.id} className="flex items-start space-x-4">
              <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>{getAlertIcon(alert.type)}</div>
              <div className="flex-1 space-y-1">
                <AlertTitle className="font-semibold">{alert.title}</AlertTitle>
                <AlertDescription className="text-sm text-muted-foreground">{alert.description}</AlertDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{alert.region}</Badge>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

