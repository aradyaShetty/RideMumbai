import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus } from 'lucide-react';

export const ManageSchedules = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Manage Schedules</h1>
            <p className="text-muted-foreground">Manage train schedules and timings</p>
          </div>
          <Button><Plus className="w-4 h-4 mr-2" />Add Schedule</Button>
        </div>
        <Card className="shadow-custom-lg">
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Schedule Management</h3>
            <p className="text-muted-foreground">Train schedule management features coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};