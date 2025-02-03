export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="min-h-screen grid lg:grid-cols-2">  {/* Full-height container using grid layout with two columns on large screens */}
      
      <div className="hidden lg:block relative">  {/* Left section: Hidden on small screens, visible on large screens */}
        
        <div className="absolute inset-0 bg-muted-foreground/10"> {/* Semi-transparent overlay for better readability of text over image */}
          
          <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60" /> {/* Gradient overlay for a subtle fade effect */}
          
          <img
            src="/disaster-alert-preview.jpg"
            alt="Disaster Alert System Preview"
            className="absolute inset-0 object-cover w-full h-full"
          /> {/* Full-width, full-height background image */}
        </div>

        <div className="relative h-full p-12 flex items-end backdrop-blur-sm"> {/* Positioned content area over the image with padding and blur effect */}
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Disaster Alert System</h1> {/* Large, bold heading */}
            
            <p className="text-white/80 max-w-[40ch]">
              Stay informed and safe with real-time alerts and emergency notifications.
            </p>   {/* Short description with limited width for better readability */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        {children}      {/* Right section: Displays the login/signup form or other children components */}
      </div>
    </div>

  )
}

