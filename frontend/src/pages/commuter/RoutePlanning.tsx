import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, 
  ArrowRight, 
  Clock, 
  Train, 
  Route,
  Navigation,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const mumbaMetroStations = [
  'Versova', 'D N Nagar', 'Azad Nagar', 'Andheri', 'Western Express Highway', 'Chakala',
  'Airport Terminal 1', 'Marol Naka', 'Saki Naka', 'Asalpha', 'Jagruti Nagar', 'Ghatkopar',
  'Colaba', 'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central',
  'Mahalaxmi', 'Lower Parel', 'Prabhadevi', 'Dadar', 'Bandra', 'Khar Road', 'Santacruz',
  'Vile Parle', 'Andheri East', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali',
  'Dahisar', 'Mira Road', 'Bhayandar', 'Naigaon', 'Vasai Road', 'Nallasopara', 'Virar'
];

interface RouteStep {
  station: string;
  line: string;
  platform: string;
  arrivalTime: string;
  departureTime: string;
  isTransfer?: boolean;
}

interface RouteResult {
  totalTime: string;
  totalDistance: string;
  fare: string;
  steps: RouteStep[];
}

export const RoutePlanning = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [travelTime, setTravelTime] = useState('now');
  const [isPlanning, setIsPlanning] = useState(false);
  const [routeResult, setRouteResult] = useState<RouteResult | null>(null);
  const { toast } = useToast();

  const handlePlanRoute = async () => {
    if (!fromStation || !toStation) {
      toast({
        title: "Missing Information",
        description: "Please select both source and destination stations",
        variant: "destructive",
      });
      return;
    }

    if (fromStation === toStation) {
      toast({
        title: "Invalid Route",
        description: "Source and destination cannot be the same",
        variant: "destructive",
      });
      return;
    }

    setIsPlanning(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock route result
    const mockResult: RouteResult = {
      totalTime: "45 minutes",
      totalDistance: "28.5 km",
      fare: "₹45",
      steps: [
        {
          station: fromStation,
          line: "Blue Line",
          platform: "Platform 1",
          arrivalTime: "09:00 AM",
          departureTime: "09:02 AM"
        },
        {
          station: "Andheri",
          line: "Blue Line",
          platform: "Platform 1",
          arrivalTime: "09:15 AM",
          departureTime: "09:17 AM",
          isTransfer: true
        },
        {
          station: toStation,
          line: "Red Line",
          platform: "Platform 2",
          arrivalTime: "09:45 AM",
          departureTime: "09:45 AM"
        }
      ]
    };

    setRouteResult(mockResult);
    setIsPlanning(false);

    toast({
      title: "Route Found!",
      description: "Your optimal route has been calculated",
    });
  };

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Plan Your Route
          </h1>
          <p className="text-muted-foreground">
            Find the best route for your Mumbai Metro journey
          </p>
        </div>

        {/* Route Planning Form */}
        <Card className="shadow-custom-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="w-5 h-5 mr-2" />
              Route Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="from">From Station</Label>
                <Select value={fromStation} onValueChange={setFromStation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source station" />
                  </SelectTrigger>
                  <SelectContent>
                    {mumbaMetroStations.map((station) => (
                      <SelectItem key={station} value={station}>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          {station}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to">To Station</Label>
                <Select value={toStation} onValueChange={setToStation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination station" />
                  </SelectTrigger>
                  <SelectContent>
                    {mumbaMetroStations.map((station) => (
                      <SelectItem key={station} value={station}>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-success" />
                          {station}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleSwapStations}
                className="rounded-full"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Travel Time</Label>
              <Select value={travelTime} onValueChange={setTravelTime}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Leave Now</SelectItem>
                  <SelectItem value="depart">Depart at Specific Time</SelectItem>
                  <SelectItem value="arrive">Arrive by Specific Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handlePlanRoute} 
              className="w-full"
              disabled={isPlanning}
              size="lg"
            >
              {isPlanning ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Planning Route...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 mr-2" />
                  Plan My Route
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Route Results */}
        {routeResult && (
          <Card className="shadow-custom-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Train className="w-5 h-5 mr-2" />
                  Route Information
                </span>
                <div className="text-right text-sm text-muted-foreground">
                  <div>Total Time: <span className="font-semibold text-foreground">{routeResult.totalTime}</span></div>
                  <div>Distance: <span className="font-semibold text-foreground">{routeResult.totalDistance}</span></div>
                  <div>Fare: <span className="font-semibold text-primary">{routeResult.fare}</span></div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routeResult.steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-success' :
                        index === routeResult.steps.length - 1 ? 'bg-destructive' :
                        'bg-primary'
                      }`} />
                      {index < routeResult.steps.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mt-2" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{step.station}</p>
                          <p className="text-sm text-muted-foreground">
                            {step.line} • {step.platform}
                          </p>
                          {step.isTransfer && (
                            <div className="flex items-center mt-1">
                              <AlertCircle className="w-3 h-3 text-warning mr-1" />
                              <span className="text-xs text-warning font-medium">Transfer</span>
                            </div>
                          )}
                        </div>
                        <div className="text-right text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {step.arrivalTime}
                          </div>
                          {step.departureTime !== step.arrivalTime && (
                            <div className="text-xs text-muted-foreground">
                              Depart: {step.departureTime}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Ready to book this journey?
                  </div>
                  <Button variant="default">
                    Book Tickets
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};