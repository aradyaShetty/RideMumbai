import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import QRCode from 'qrcode.react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  RotateCcw,
  MapPin,
  Calendar,
  Clock,
  Users,
  CreditCard
} from 'lucide-react';

interface TicketHistory {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  passengers: number;
  fare: number;
  status: 'completed' | 'cancelled' | 'upcoming';
  ticketType: string;
  bookingId: string;
}

const mockTickets: TicketHistory[] = [
  {
    id: '1',
    from: 'Andheri',
    to: 'Ghatkopar',
    date: '2024-01-15',
    time: '09:30 AM',
    passengers: 1,
    fare: 45,
    status: 'completed',
    ticketType: 'Single Journey',
    bookingId: 'RM123456789'
  },
  {
    id: '2',
    from: 'Colaba',
    to: 'Versova',
    date: '2024-01-14',
    time: '06:15 PM',
    passengers: 2,
    fare: 90,
    status: 'completed',
    ticketType: 'Return Journey',
    bookingId: 'RM987654321'
  },
  {
    id: '3',
    from: 'Bandra',
    to: 'Airport Terminal 1',
    date: '2024-01-10',
    time: '02:45 PM',
    passengers: 1,
    fare: 55,
    status: 'cancelled',
    ticketType: 'Single Journey',
    bookingId: 'RM456789123'
  },
  {
    id: '4',
    from: 'Churchgate',
    to: 'Andheri',
    date: '2024-01-20',
    time: '08:00 AM',
    passengers: 1,
    fare: 40,
    status: 'upcoming',
    ticketType: 'Single Journey',
    bookingId: 'RM789123456'
  }
];

export const TravelHistory = () => {
  const [tickets] = useState<TicketHistory[]>(mockTickets);
  const [filteredTickets, setFilteredTickets] = useState<TicketHistory[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<TicketHistory | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterTickets(term, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterTickets(searchTerm, status);
  };

  const filterTickets = (search: string, status: string) => {
    let filtered = tickets;

    if (search) {
      filtered = filtered.filter(ticket => 
        ticket.from.toLowerCase().includes(search.toLowerCase()) ||
        ticket.to.toLowerCase().includes(search.toLowerCase()) ||
        ticket.bookingId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === status);
    }

    setFilteredTickets(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      case 'upcoming':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleRebook = (ticket: TicketHistory) => {
    // In a real app, this would navigate to booking page with pre-filled data
    console.log('Rebooking ticket:', ticket);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Travel History
          </h1>
          <p className="text-muted-foreground">
            View and manage your past and upcoming journeys
          </p>
        </div>

        {/* Filters */}
        <Card className="shadow-custom-md mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by station or booking ID..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={handleStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <Card className="shadow-custom-md">
              <CardContent className="p-8 text-center">
                <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No tickets found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'You haven\'t booked any tickets yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="shadow-custom-md hover:shadow-custom-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Ticket Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-semibold">{ticket.from}</span>
                            <span className="text-muted-foreground">→</span>
                            <MapPin className="w-4 h-4 text-success" />
                            <span className="font-semibold">{ticket.to}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{new Date(ticket.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{ticket.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{ticket.passengers} passenger{ticket.passengers > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">₹{ticket.fare}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground">Booking ID: </span>
                          <span className="text-xs font-mono font-semibold">{ticket.bookingId}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{ticket.ticketType}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2 lg:w-auto w-full">
                      {ticket.status === 'upcoming' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          View QR
                        </Button>
                      )}
                      {ticket.status === 'completed' && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRebook(ticket)}
                          >
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Rebook
                          </Button>
                        </>
                      )}
                      {ticket.status === 'cancelled' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRebook(ticket)}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Rebook
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* QR Code Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center">Travel Ticket</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <QRCode 
                    value={JSON.stringify({
                      bookingId: selectedTicket.bookingId,
                      from: selectedTicket.from,
                      to: selectedTicket.to,
                      date: selectedTicket.date,
                      passengers: selectedTicket.passengers
                    })}
                    size={200}
                    className="mx-auto"
                  />
                </div>
                
                <div className="text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route:</span>
                    <span>{selectedTicket.from} → {selectedTicket.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{new Date(selectedTicket.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID:</span>
                    <span className="font-mono">{selectedTicket.bookingId}</span>
                  </div>
                </div>

                <Button onClick={() => setSelectedTicket(null)} className="w-full">
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};