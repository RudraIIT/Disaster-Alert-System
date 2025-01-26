export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-muted-foreground/10">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" />
          <img
            src="/disaster-alert-preview.jpg"
            alt="Disaster Alert System Preview"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </div>
        <div className="relative h-full p-12 flex items-end backdrop-blur-sm">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Disaster Alert System</h1>
            <p className="text-white/80 max-w-[40ch]">
              Stay informed and safe with real-time alerts and emergency notifications.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">{children}</div>
    </div>
  )
}

