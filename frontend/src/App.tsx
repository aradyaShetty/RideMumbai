import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Auth Pages
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";

// Commuter Pages
import { Dashboard } from "@/pages/commuter/Dashboard";
import { RoutePlanning } from "@/pages/commuter/RoutePlanning";
import { TicketBooking } from "@/pages/commuter/TicketBooking";
import { TravelHistory } from "@/pages/commuter/TravelHistory";
import { Profile } from "@/pages/commuter/Profile";

// Admin Pages
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { ManageRoutes } from "@/pages/admin/ManageRoutes";
import { ManageSchedules } from "@/pages/admin/ManageSchedules";
import { UserManagement } from "@/pages/admin/UserManagement";
import { AdminNotifications } from "@/pages/admin/AdminNotifications";

// Shared Pages
import { Welcome } from "@/pages/Welcome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user?.userType !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={user?.userType === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicRoute><Welcome /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
      
      {/* Commuter Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/route-planning" element={<ProtectedRoute><RoutePlanning /></ProtectedRoute>} />
      <Route path="/booking" element={<ProtectedRoute><TicketBooking /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><TravelHistory /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/routes" element={<ProtectedRoute adminOnly><ManageRoutes /></ProtectedRoute>} />
      <Route path="/admin/schedules" element={<ProtectedRoute adminOnly><ManageSchedules /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute adminOnly><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute adminOnly><AdminNotifications /></ProtectedRoute>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
