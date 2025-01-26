import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Ambulance, FireExtinguisherIcon as FireEngine, BadgeIcon as Police } from "lucide-react"

const emergencyContacts = [
  {
    name: "Emergency Services",
    number: "911",
    icon: Phone,
    description: "For immediate emergency assistance",
  },
  {
    name: "Medical Emergency",
    number: "911",
    icon: Ambulance,
    description: "For medical emergencies",
  },
  {
    name: "Fire Department",
    number: "911",
    icon: FireEngine,
    description: "For fire-related emergencies",
  },
  {
    name: "Police Department",
    number: "911",
    icon: Police,
    description: "For law enforcement assistance",
  },
]

export default function EmergencyContacts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contacts</CardTitle>
        <CardDescription>Important numbers for emergency situations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {emergencyContacts.map((contact) => (
            <div key={contact.name} className="flex items-center space-x-4 rounded-lg border p-4">
              <div className="p-2 bg-muted rounded-full">
                <contact.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
              <Button variant="secondary" size="sm">
                {contact.number}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

