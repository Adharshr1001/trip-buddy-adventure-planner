
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

const TripMateHero = () => {
  // Scroll to chat function
  const scrollToChat = () => {
    const chatSection = document.getElementById("chat-section");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-tripmate-blue/10 to-tripmate-teal/10 -z-10" />
      
      {/* Floating elements for decoration */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-tripmate-blue/10 rounded-full animate-float hidden lg:block" />
      <div className="absolute bottom-10 right-20 w-16 h-16 bg-tripmate-teal/10 rounded-full animate-float animation-delay-1000 hidden lg:block" />
      <div className="absolute top-40 right-30 w-12 h-12 bg-tripmate-amber/10 rounded-full animate-float animation-delay-2000 hidden lg:block" />
      
      <div className="container px-4 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your AI Travel Buddy for 
              <span className="bg-gradient-to-r from-tripmate-blue to-tripmate-teal text-transparent bg-clip-text"> Perfect Vacations</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Plan your next adventure with personalized recommendations, budget estimates, and activity suggestions—all in one friendly chat.
            </p>
            <Button 
              onClick={scrollToChat}
              className="bg-gradient-to-r from-tripmate-blue to-tripmate-teal hover:opacity-90 transition-opacity text-white px-8 py-6 rounded-full"
            >
              <Compass className="mr-2 h-5 w-5" /> Start Planning
            </Button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-tripmate-blue/20 to-tripmate-teal/20 rounded-2xl transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Travel Planning" 
                className="relative z-10 rounded-2xl shadow-lg transform -rotate-2 transition-transform hover:rotate-0 duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripMateHero;
