
import { Compass } from "lucide-react";

const TripMateHeader = () => {
  return (
    <header className="py-6 px-4 sm:px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-tripmate-blue to-tripmate-teal p-2 rounded-lg">
              <Compass className="text-white h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-tripmate-blue to-tripmate-teal inline-block text-transparent bg-clip-text">
              TripMate
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TripMateHeader;
