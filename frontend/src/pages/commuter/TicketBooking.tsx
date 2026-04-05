import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Layout } from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import QRCode from 'qrcode.react';
import { 
  Ticket, 
  CreditCard, 
  MapPin, 
  Users, 
  Calendar,
  Clock,
  CheckCircle2,
  Smartphone,
  Download
} from 'lucide-react';

const mumbaMetroStations = [
  'Versova', 'D N Nagar', 'Azad Nagar', 'Andheri', 'Western Express Highway', 'Chakala',
  'Airport Terminal 1', 'Marol Naka', 'Saki Naka', 'Asalpha', 'Jagruti Nagar', 'Ghatkopar',
  'Colaba', 'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central'
];

const ticketTypes = [
  { id: 'single', name: 'Single Journey', description: 'One-way ticket for immediate travel' },
  { id: 'return', name: 'Return Journey', description: 'Round-trip ticket valid for same day' },
  { id: 'weekly', name: 'Weekly Pass', description: 'Unlimited travel for 7 days' },
  { id: 'monthly', name: 'Monthly Pass', description: 'Unlimited travel for 30 days' }
];

interface BookingDetails {
  from: string;
  to: string;
  ticketType: string;
  passengers: number;
  travelDate: string;
  totalFare: number;
  bookingId: string;
}

export const TicketBooking = () => {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [ticketType, setTicketType] = useState('single');
  const [passengers, setPassengers] = useState(1);
  const [travelDate, setTravelDate] = useState(new Date().toISOString().split('T')[0]);
  const [isBooking, setIsBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const { toast } = useToast();

  const calculateFare = () => {
    const baseFare = 35;
    const multiplier = ticketType === 'return' ? 1.8 : ticketType === 'weekly' ? 25 : ticketType === 'monthly' ? 90 : 1;
    return Math.round(baseFare * multiplier * passengers);
  };

  const handleBookTicket = () => {
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

    setShowPayment(true);
  };

  const handlePayment = async () => {
    setIsProcessingPayment(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const booking: BookingDetails = {
      from: fromStation,
      to: toStation,
      ticketType,
      passengers,
      travelDate,
      totalFare: calculateFare(),
      bookingId: 'RM' + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    setBookingDetails(booking);
    setIsProcessingPayment(false);
    setShowPayment(false);
    setBookingComplete(true);

    toast({
      title: "Booking Successful!",
      description: "Your tickets have been booked successfully",
    });
  };

  const qrCodeData = bookingDetails ? JSON.stringify({
    bookingId: bookingDetails.bookingId,
    from: bookingDetails.from,
    to: bookingDetails.to,
    passengers: bookingDetails.passengers,
    date: bookingDetails.travelDate,
    fare: bookingDetails.totalFare
  }) : '';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Book Your Ticket
          </h1>
          <p className="text-muted-foreground">
            Quick and easy ticket booking for Mumbai Metro
          </p>
        </div>

        {!bookingComplete ? (
          <Card className="shadow-custom-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ticket className="w-5 h-5 mr-2" />
                Ticket Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Route Selection */}
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

              {/* Ticket Type Selection */}
              <div className="space-y-3">
                <Label>Ticket Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ticketTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        ticketType === type.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setTicketType(type.id)}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          ticketType === type.id ? 'border-primary bg-primary' : 'border-border'
                        }`} />
                        <h3 className="font-medium">{type.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passengers and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select value={passengers.toString()} onValueChange={(value) => setPassengers(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {num} {num === 1 ? 'Passenger' : 'Passengers'}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Travel Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="pl-10"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Fare Summary */}
              {fromStation && toStation && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Base Fare per person:</span>
                    <span className="font-medium">₹35</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Passengers:</span>
                    <span className="font-medium">{passengers}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 pb-3 border-b">
                    <span className="text-sm text-muted-foreground">Ticket Type:</span>
                    <span className="font-medium">{ticketTypes.find(t => t.id === ticketType)?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Fare:</span>
                    <span className="text-2xl font-bold text-primary">₹{calculateFare()}</span>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleBookTicket} 
                className="w-full"
                disabled={isBooking}
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Booking Success Screen
          <div className="space-y-6">
            <Card className="shadow-custom-lg text-center border-success">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Booking Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  Your tickets have been booked. Show the QR code at the station for entry.
                </p>
                
                {/* Booking Details */}
                {bookingDetails && (
                  <div className="max-w-md mx-auto">
                    <div className="bg-gradient-card p-6 rounded-lg mb-6">
                      <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Booking ID:</span>
                          <span className="font-mono font-semibold">{bookingDetails.bookingId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Route:</span>
                          <span>{bookingDetails.from} → {bookingDetails.to}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Passengers:</span>
                          <span>{bookingDetails.passengers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{new Date(bookingDetails.travelDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total Paid:</span>
                          <span className="text-primary">₹{bookingDetails.totalFare}</span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
                      <QRCode 
                        value={qrCodeData}
                        size={200}
                        className="mx-auto"
                      />
                      <p className="text-xs text-gray-600 mt-2">Scan this QR code at the station</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download Ticket
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Add to Wallet
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button onClick={() => setBookingComplete(false)}>
                Book Another Ticket
              </Button>
              <Button variant="outline">
                View All Bookings
              </Button>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Route:</span>
                    <span>{fromStation} → {toStation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passengers:</span>
                    <span>{passengers}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">₹{calculateFare()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['UPI', 'Card', 'Wallet', 'Net Banking'].map((method) => (
                    <div key={method} className="p-3 border rounded cursor-pointer hover:border-primary">
                      <div className="text-center text-sm font-medium">{method}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handlePayment} 
                className="w-full" 
                disabled={isProcessingPayment}
                size="lg"
              >
                {isProcessingPayment ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing Payment...
                  </>
                ) : (
                  <>Pay ₹{calculateFare()}</>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};