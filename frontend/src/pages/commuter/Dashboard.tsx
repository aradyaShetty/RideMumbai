import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { 
  Route, 
  Ticket, 
  History, 
  User, 
  Clock, 
  MapPin,
  CreditCard,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Plan Route',
      description: 'Find the best route for your journey',
      icon: Route,
      path: '/route-planning',
      color: 'bg-primary',
    },
    {
      title: 'Book Ticket',
      description: 'Quick ticket booking for your trip',
      icon: Ticket,
      path: '/booking',
      color: 'bg-success',
    },
    {
      title: 'Travel History',
      description: 'View your past journeys',
      icon: History,
      path: '/history',
      color: 'bg-accent',
    },
    {
      title: 'Profile',
      description: 'Manage your account settings',
      icon: User,
      path: '/profile',
      color: 'bg-secondary',
    },
  ];

  const recentActivity = [
    {
      type: 'booking',
      description: 'Booked ticket from Andheri to Ghatkopar',
      time: '2 hours ago',
      amount: '₹45',
    },
    {
      type: 'planning',
      description: 'Planned route from Colaba to Versova',
      time: '1 day ago',
      amount: null,
    },
    {
      type: 'booking',
      description: 'Booked ticket from Bandra to Airport',
      time: '3 days ago',
      amount: '₹55',
    },
  ];

  const stats = [
    {
      label: 'Total Trips',
      value: '47',
      change: '+12%',
      icon: MapPin,
    },
    {
      label: 'This Month',
      value: '₹1,240',
      change: '+8%',
      icon: CreditCard,
    },
    {
      label: 'Avg. Trip Time',
      value: '32 min',
      change: '-5%',
      icon: Clock,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Ready for your next journey? Let's get you moving.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-custom-md hover:shadow-custom-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm flex items-center text-success">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Card key={index} className="shadow-custom-md hover:shadow-custom-lg transition-all duration-200 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${action.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {action.description}
                          </p>
                          <Button asChild variant="outline" size="sm">
                            <Link to={action.path} className="inline-flex items-center">
                              Get Started
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/history">View All</Link>
              </Button>
            </div>
            
            <Card className="shadow-custom-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'booking' ? 'bg-primary' : 'bg-accent'
                        }`}>
                          {activity.type === 'booking' ? (
                            <Ticket className="w-4 h-4 text-white" />
                          ) : (
                            <Route className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {activity.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-foreground">
                          {activity.amount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tip */}
            <Card className="shadow-custom-md bg-gradient-hero border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  💡 Pro Tip
                </h3>
                <p className="text-white/90 text-sm">
                  Book your return tickets in advance to save up to 15% and avoid queues during peak hours.
                </p>
                <Button variant="secondary" size="sm" className="mt-4">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};