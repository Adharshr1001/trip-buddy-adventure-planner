
import { Compass } from "lucide-react";

const TripMateFooter = () => {
  return (
    <footer className="bg-muted py-8 px-4 mt-10">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-tripmate-blue to-tripmate-teal p-1 rounded-md">
              <Compass className="text-white h-4 w-4" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-tripmate-blue to-tripmate-teal inline-block text-transparent bg-clip-text">
              TripMate
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© 2025 TripMate AI Assistant. All rights reserved.</p>
            <p className="mt-1">Your friendly travel planning companion</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TripMateFooter;
