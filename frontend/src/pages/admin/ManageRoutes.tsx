import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { 
  Route, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Clock,
  Train,
  Users,
  Search
} from 'lucide-react';

interface MetroRoute {
  id: string;
  name: string;
  color: string;
  stations: string[];
  status: 'active' | 'maintenance' | 'inactive';
  length: string;
  avgTime: string;
  dailyRiders: number;
}

const mockRoutes: MetroRoute[] = [
  {
    id: '1',
    name: 'Blue Line (Versova - Ghatkopar)',
    color: '#0066CC',
    stations: ['Versova', 'D N Nagar', 'Azad Nagar', 'Andheri', 'Western Express Highway', 'Chakala', 'Airport Terminal 1', 'Marol Naka', 'Saki Naka', 'Asalpha', 'Jagruti Nagar', 'Ghatkopar'],
    status: 'active',
    length: '11.4 km',
    avgTime: '21 min',
    dailyRiders: 120000
  },
  {
    id: '2',
    name: 'Red Line (Colaba - Dahisar East)',
    color: '#CC0000',
    stations: ['Colaba', 'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central', 'Mahalaxmi', 'Lower Parel', 'Prabhadevi', 'Dadar', 'Bandra', 'Khar Road', 'Santacruz', 'Vile Parle', 'Andheri East', 'Jogeshwari', 'Goregaon', 'Malad', 'Kandivali', 'Borivali', 'Dahisar East'],
    status: 'active',
    length: '31.2 km',
    avgTime: '58 min',
    dailyRiders: 180000
  },
  {
    id: '3',
    name: 'Green Line (Colaba - BKC)',
    color: '#009900',
    stations: ['Colaba', 'Cuffe Parade', 'Senapati Bapat Marg', 'BKC'],
    status: 'maintenance',
    length: '8.5 km',
    avgTime: '15 min',
    dailyRiders: 45000
  }
];

export const ManageRoutes = () => {
  const [routes, setRoutes] = useState<MetroRoute[]>(mockRoutes);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingRoute, setIsAddingRoute] = useState(false);
  const [editingRoute, setEditingRoute] = useState<MetroRoute | null>(null);
  const { toast } = useToast();

  const [newRoute, setNewRoute] = useState({
    name: '',
    color: '#0066CC',
    stations: '',
    length: '',
    avgTime: ''
  });

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.stations.some(station => station.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddRoute = () => {
    if (!newRoute.name || !newRoute.stations) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const route: MetroRoute = {
      id: Date.now().toString(),
      name: newRoute.name,
      color: newRoute.color,
      stations: newRoute.stations.split(',').map(s => s.trim()),
      status: 'active',
      length: newRoute.length,
      avgTime: newRoute.avgTime,
      dailyRiders: 0
    };

    setRoutes([...routes, route]);
    setNewRoute({ name: '', color: '#0066CC', stations: '', length: '', avgTime: '' });
    setIsAddingRoute(false);

    toast({
      title: "Route Added",
      description: "New metro route has been successfully added",
    });
  };

  const handleDeleteRoute = (routeId: string) => {
    setRoutes(routes.filter(route => route.id !== routeId));
    toast({
      title: "Route Deleted",
      description: "Metro route has been removed from the system",
    });
  };

  const toggleRouteStatus = (routeId: string) => {
    setRoutes(routes.map(route => {
      if (route.id === routeId) {
        const newStatus = route.status === 'active' ? 'maintenance' : 'active';
        return { ...route, status: newStatus };
      }
      return route;
    }));

    toast({
      title: "Route Status Updated",
      description: "Route status has been successfully changed",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'maintenance':
        return 'bg-warning text-warning-foreground';
      case 'inactive':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Manage Routes
            </h1>
            <p className="text-muted-foreground">
              Add, edit, and manage Mumbai Metro routes
            </p>
          </div>
          
          <Dialog open={isAddingRoute} onOpenChange={setIsAddingRoute}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Route
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Metro Route</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input
                    id="routeName"
                    placeholder="e.g., Yellow Line (Andheri - Colaba)"
                    value={newRoute.name}
                    onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="routeColor">Line Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="routeColor"
                        type="color"
                        value={newRoute.color}
                        onChange={(e) => setNewRoute({ ...newRoute, color: e.target.value })}
                        className="w-20 h-10 p-1"
                      />
                      <Input
                        value={newRoute.color}
                        onChange={(e) => setNewRoute({ ...newRoute, color: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="routeLength">Route Length</Label>
                    <Input
                      id="routeLength"
                      placeholder="e.g., 15.2 km"
                      value={newRoute.length}
                      onChange={(e) => setNewRoute({ ...newRoute, length: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avgTime">Average Journey Time</Label>
                  <Input
                    id="avgTime"
                    placeholder="e.g., 25 min"
                    value={newRoute.avgTime}
                    onChange={(e) => setNewRoute({ ...newRoute, avgTime: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stations">Stations (comma-separated)</Label>
                  <textarea
                    id="stations"
                    className="w-full min-h-[100px] p-3 border border-input rounded-md resize-none"
                    placeholder="e.g., Station A, Station B, Station C, Station D"
                    value={newRoute.stations}
                    onChange={(e) => setNewRoute({ ...newRoute, stations: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    List all stations in order, separated by commas
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingRoute(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRoute}>
                    Add Route
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="shadow-custom-md mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes or stations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRoutes.map((route) => (
            <Card key={route.id} className="shadow-custom-lg hover:shadow-custom-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-12 rounded-full"
                      style={{ backgroundColor: route.color }}
                    />
                    <div>
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {route.stations.length} stations
                        </span>
                        <span className="flex items-center">
                          <Route className="w-3 h-3 mr-1" />
                          {route.length}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {route.avgTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(route.status)}>
                    {route.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Station List Preview */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Stations</h4>
                  <div className="flex flex-wrap gap-1">
                    {route.stations.slice(0, 4).map((station, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {station}
                      </Badge>
                    ))}
                    {route.stations.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{route.stations.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{route.stations.length}</div>
                    <div className="text-xs text-muted-foreground">Stations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{(route.dailyRiders / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-muted-foreground">Daily Riders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{route.avgTime}</div>
                    <div className="text-xs text-muted-foreground">Journey Time</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleRouteStatus(route.id)}
                    >
                      <Train className="w-3 h-3 mr-1" />
                      {route.status === 'active' ? 'Set Maintenance' : 'Activate'}
                    </Button>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteRoute(route.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <Card className="shadow-custom-md">
            <CardContent className="p-8 text-center">
              <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No routes found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by adding your first metro route.'}
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsAddingRoute(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Route
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};