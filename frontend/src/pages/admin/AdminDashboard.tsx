import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { 
  Users, 
  Route, 
  Calendar, 
  Bell,
  TrendingUp,
  TrendingDown,
  MapPin,
  Clock,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user } = useAuth();

  const adminActions = [
    {
      title: 'Manage Routes',
      description: 'Add, edit, or remove metro routes',
      icon: Route,
      path: '/admin/routes',
      color: 'bg-primary',
      count: '12 Routes',
    },
    {
      title: 'Schedules',
      description: 'Manage train schedules and timings',
      icon: Calendar,
      path: '/admin/schedules',
      color: 'bg-success',
      count: '45 Schedules',
    },
    {
      title: 'User Management',
      description: 'Activate or deactivate user accounts',
      icon: Users,
      path: '/admin/users',
      color: 'bg-accent',
      count: '2,847 Users',
    },
    {
      title: 'Notifications',
      description: 'Send alerts and updates to users',
      icon: Bell,
      path: '/admin/notifications',
      color: 'bg-warning',
      count: '3 Pending',
    },
  ];

  const systemStats = [
    {
      label: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Daily Revenue',
      value: '₹1,24,500',
      change: '+8%',
      trend: 'up',
      icon: CreditCard,
    },
    {
      label: 'Active Routes',
      value: '12',
      change: '0%',
      trend: 'neutral',
      icon: MapPin,
    },
    {
      label: 'Avg Delay',
      value: '2.3 min',
      change: '-15%',
      trend: 'down',
      icon: Clock,
    },
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'Route Maintenance',
      description: 'Andheri-Ghatkopar line scheduled for maintenance on Sunday',
      time: '2 hours ago',
    },
    {
      type: 'success',
      title: 'New Route Added',
      description: 'Successfully added Colaba-BKC express route',
      time: '1 day ago',
    },
    {
      type: 'error',
      title: 'System Alert',
      description: 'Payment gateway experiencing intermittent issues',
      time: '3 hours ago',
    },
  ];

  const recentActivity = [
    { user: 'Priya Sharma', action: 'Booked ticket', route: 'Andheri → Ghatkopar', time: '2 min ago' },
    { user: 'Rahul Patel', action: 'Planned route', route: 'Colaba → Versova', time: '5 min ago' },
    { user: 'Admin User', action: 'Updated schedule', route: 'Line 1 - Blue', time: '10 min ago' },
    { user: 'Sneha Iyer', action: 'Cancelled booking', route: 'Bandra → Airport', time: '15 min ago' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage RideMumbai system operations and monitor performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Clock;
            return (
              <Card key={index} className="shadow-custom-md hover:shadow-custom-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-success' : 
                      stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      <TrendIcon className="w-3 h-3 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Actions */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">System Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminActions.map((action, index) => {
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
                          <p className="text-sm text-muted-foreground mb-2">
                            {action.description}
                          </p>
                          <p className="text-xs text-primary font-medium mb-3">
                            {action.count}
                          </p>
                          <Button asChild variant="outline" size="sm">
                            <Link to={action.path} className="inline-flex items-center">
                              Manage
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

            {/* Recent Activity */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Card className="shadow-custom-md">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary">
                              {activity.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              <span className="text-primary">{activity.user}</span> {activity.action}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.route}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">System Alerts</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/admin/notifications">View All</Link>
              </Button>
            </div>
            
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <Card key={index} className="shadow-custom-md">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`mt-0.5 ${
                        alert.type === 'error' ? 'text-destructive' :
                        alert.type === 'warning' ? 'text-warning' :
                        'text-success'
                      }`}>
                        {alert.type === 'error' ? (
                          <AlertTriangle className="w-4 h-4" />
                        ) : alert.type === 'warning' ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {alert.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Stats */}
            <Card className="shadow-custom-md bg-gradient-hero border-0">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  System Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">Uptime</span>
                    <span className="text-white font-semibold">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">Active Trains</span>
                    <span className="text-white font-semibold">47/52</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90 text-sm">Peak Capacity</span>
                    <span className="text-white font-semibold">78%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};