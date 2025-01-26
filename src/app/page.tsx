import AlertFeed from "@/components/alert-feed"
import AlertMap from "@/components/alert-map"
import CreateAlert from "@/components/create-alert"
import EmergencyContacts from "@/components/emergency-contacts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-16">
          <h1 className="text-2xl font-bold">Disaster Alert System</h1>
        </div>
      </header>
      <main className="container mx-auto py-4 px-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Tabs defaultValue="alerts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
                <TabsTrigger value="create">Create Alert</TabsTrigger>
              </TabsList>
              <TabsContent value="alerts" className="mt-6">
                <AlertFeed />
              </TabsContent>
              <TabsContent value="create" className="mt-6">
                <CreateAlert />
              </TabsContent>
            </Tabs>
            <EmergencyContacts />
          </div>
          <div className="rounded-lg border bg-card overflow-hidden h-[calc(100vh-8rem)]">
            <AlertMap />
          </div>
        </div>
      </main>
    </div>
  )
}

