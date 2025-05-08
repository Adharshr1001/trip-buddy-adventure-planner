import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Airplay, Bed, Calendar, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Message = {
  id: string;
  sender: "user" | "assistant";
  text: string;
};

type LocationData = {
  origin: string;
  destination: string;
};

type TransportOption = {
  type: string;
  icon: React.ReactNode;
  title: string;
  duration: string;
  cost: string;
};

type AccommodationOption = {
  title: string;
  type: string;
  rating: number;
  price: string;
  imageUrl: string;
};

type ActivityOption = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
};

const TripMateChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "👋 Hi there! I'm TripMate, your friendly travel planning assistant! Where are you planning to travel from and to?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [locations, setLocations] = useState<LocationData | null>(null);
  const [showTransportOptions, setShowTransportOptions] = useState(false);
  const [showAccommodations, setShowAccommodations] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showTransportOptions, showAccommodations, showActivities]);

  const transportOptions: TransportOption[] = [
    {
      type: "flight",
      icon: <Airplay className="h-5 w-5" />,
      title: "Flight",
      duration: "1h 30m",
      cost: "$120 - $250",
    },
    {
      type: "train",
      icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15l4-8 4 16 4-16 4 8"/></svg>,
      title: "Train",
      duration: "3h 15m",
      cost: "$45 - $80",
    },
    {
      type: "bus",
      icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6m8-6v6M3 12h18M19 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM5 18v2m14-2v2"/></svg>,
      title: "Bus",
      duration: "4h 45m",
      cost: "$30 - $50",
    },
  ];

  const accommodationOptions: AccommodationOption[] = [
    {
      title: "Seaside Resort",
      type: "Luxury",
      rating: 4.8,
      price: "$250/night",
      imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Downtown Hotel",
      type: "Mid-range",
      rating: 4.3,
      price: "$120/night",
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Cozy Apartment",
      type: "Budget",
      rating: 4.1,
      price: "$75/night",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const activityOptions: ActivityOption[] = [
    {
      title: "Beach Day Trip",
      description: "Enjoy a relaxing day at the famous beaches with guided tours.",
      price: "$25/person",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Historic City Tour",
      description: "Explore the rich history and architecture of downtown.",
      price: "$35/person",
      imageUrl: "https://images.unsplash.com/photo-1519112232436-9923c6ba3d26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eSUyMHRvdXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Food & Wine Tasting",
      description: "Sample local cuisine and wines with expert guides.",
      price: "$55/person",
      imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHRvdXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const extractLocations = (text: string): LocationData | null => {
    // Simple extraction logic - looking for "from [origin] to [destination]" pattern
    const pattern = /(?:from\s+)([a-zA-Z\s]+)(?:\s+to\s+)([a-zA-Z\s]+)/i;
    const match = text.match(pattern);
    
    if (match && match.length === 3) {
      return {
        origin: match[1].trim(),
        destination: match[2].trim(),
      };
    }
    
    // Alternative pattern: "[origin] to [destination]"
    const altPattern = /([a-zA-Z\s]+)(?:\s+to\s+)([a-zA-Z\s]+)/i;
    const altMatch = text.match(altPattern);
    
    if (altMatch && altMatch.length === 3) {
      return {
        origin: altMatch[1].trim(),
        destination: altMatch[2].trim(),
      };
    }
    
    return null;
  };

  const simulateTyping = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "assistant",
          text,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleTransportSelect = (transportType: string) => {
    setShowTransportOptions(false);
    simulateTyping(`Great choice! ${transportType} is a convenient option. Let's look at some accommodation options for your stay.`);
    setTimeout(() => {
      setShowAccommodations(true);
    }, 1500);
  };

  const handleAccommodationSelect = (accommodationType: string) => {
    setShowAccommodations(false);
    simulateTyping(`Excellent! ${accommodationType} looks perfect for your stay. Now, let's explore some fun activities at your destination!`);
    setTimeout(() => {
      setShowActivities(true);
    }, 1500);
  };

  const handleActivitySelect = (activityTitle: string) => {
    setShowActivities(false);
    simulateTyping(`${activityTitle} is a great choice! Based on your selections, here's an estimated budget for your trip:
    
- Transportation: ~$150
- Accommodation (4 nights): ~$480
- Activities: ~$120
- Food & Miscellaneous: ~$250

Total estimated cost: ~$1,000

Would you like to adjust any part of your itinerary or get more specific recommendations?`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    
    // Check if the message contains location information
    const extractedLocations = extractLocations(newMessage.text);
    
    if (extractedLocations && !locations) {
      setLocations(extractedLocations);
      
      // Respond after a short delay to simulate thinking
      setTimeout(() => {
        simulateTyping(`Great! Planning a trip from ${extractedLocations.origin} to ${extractedLocations.destination}! When are you planning to travel and what's your budget range?`);
      }, 1000);
    } else if (newMessage.text.toLowerCase().includes("budget") || 
               newMessage.text.toLowerCase().includes("cost") || 
               newMessage.text.toLowerCase().includes("money")) {
      // If locations are set and user asks about budget or mentions dates
      if (locations) {
        setTimeout(() => {
          simulateTyping("Thanks for sharing! Let's look at the best transportation options for your trip.");
          setTimeout(() => {
            setShowTransportOptions(true);
          }, 1000);
        }, 1000);
      } else {
        simulateTyping("Before we talk about budget, could you tell me where you're traveling from and to?");
      }
    } else {
      // Generic response
      setTimeout(() => {
        if (locations) {
          simulateTyping("Thanks for sharing! Let's look at the best transportation options for your trip.");
          setTimeout(() => {
            setShowTransportOptions(true);
          }, 1000);
        } else {
          simulateTyping("That sounds interesting! To help you better, could you tell me where you're traveling from and to? For example, 'I'm planning to travel from New York to Miami'.");
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-xl px-4 py-3 bg-muted">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-150"></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}

          {showTransportOptions && (
            <div className="flex justify-start">
              <div className="max-w-[85%] w-full">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  Choose your preferred transportation:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {transportOptions.map((option) => (
                    <Card
                      key={option.type}
                      className="p-4 cursor-pointer hover:border-primary transition-all"
                      onClick={() => handleTransportSelect(option.title)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          {option.icon}
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{option.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {option.duration}
                          </div>
                          <div className="text-sm font-medium mt-1 text-tripmate-blue">
                            {option.cost}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showAccommodations && (
            <div className="flex justify-start">
              <div className="max-w-[90%] w-full">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  Choose your accommodation:
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {accommodationOptions.map((option) => (
                    <Card
                      key={option.title}
                      className="p-0 cursor-pointer hover:border-primary transition-all overflow-hidden"
                      onClick={() => handleAccommodationSelect(option.title)}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 h-32 sm:h-auto">
                          <img
                            src={option.imageUrl}
                            alt={option.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{option.title}</h4>
                              <div className="text-sm text-muted-foreground">
                                {option.type}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-tripmate-blue">
                                {option.price}
                              </div>
                              <div className="flex items-center text-tripmate-amber">
                                <svg
                                  className="w-4 h-4 fill-current mr-1"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                                <span className="text-sm">{option.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showActivities && (
            <div className="flex justify-start">
              <div className="max-w-[90%] w-full">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                  Choose activities at your destination:
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {activityOptions.map((option) => (
                    <Card
                      key={option.title}
                      className="p-0 cursor-pointer hover:border-primary transition-all overflow-hidden"
                      onClick={() => handleActivitySelect(option.title)}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-1/3 h-32 sm:h-auto">
                          <img
                            src={option.imageUrl}
                            alt={option.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{option.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {option.description}
                              </p>
                            </div>
                            <div className="font-medium text-tripmate-blue">
                              {option.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Tell me about your travel plans..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TripMateChat;
