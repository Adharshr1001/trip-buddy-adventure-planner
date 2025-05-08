
import TripMateHeader from "@/components/TripMateHeader";
import TripMateHero from "@/components/TripMateHero";
import TripMateFeatures from "@/components/TripMateFeatures";
import TripMateChat from "@/components/TripMateChat";
import TripMateFooter from "@/components/TripMateFooter";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TripMateHeader />
      <main className="flex-grow">
        <TripMateHero />
        <TripMateFeatures />
        <section id="chat-section" className="py-10 px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Chat with TripMate</h2>
            <p className="text-muted-foreground">Tell me about your travel plans and I'll help you organize the perfect trip</p>
          </div>
          <TripMateChat />
        </section>
      </main>
      <TripMateFooter />
    </div>
  );
};

export default Index;
