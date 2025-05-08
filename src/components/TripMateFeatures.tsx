
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Compass, Map, MapPin } from "lucide-react";

const TripMateFeatures = () => {
  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-tripmate-blue" />,
      title: "Smart Destination Tips",
      description: "Get personalized recommendations based on your interests and budget.",
    },
    {
      icon: <Calendar className="h-6 w-6 text-tripmate-blue" />,
      title: "Trip Planning",
      description: "Organize your itinerary with our easy-to-use planning tools.",
    },
    {
      icon: <Map className="h-6 w-6 text-tripmate-blue" />,
      title: "Route Suggestions",
      description: "Find the best routes and transportation options for your journey.",
    },
    {
      icon: <Compass className="h-6 w-6 text-tripmate-blue" />,
      title: "Activity Discovery",
      description: "Explore exciting activities and hidden gems at your destination.",
    },
  ];

  return (
    <div className="py-10 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Why Travel With TripMate?</h2>
        <p className="text-muted-foreground">Your all-in-one travel planning companion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="tripmate-shadow border-none">
            <CardContent className="flex flex-col items-center text-center pt-6">
              <div className="rounded-full bg-muted p-3 mb-4">{feature.icon}</div>
              <h3 className="font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TripMateFeatures;
