-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('USER', 'ADMIN');

-- Create enum for payment status
CREATE TYPE public.payment_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role public.user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create stations table
CREATE TABLE public.stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  distance_km DECIMAL(10, 2) NOT NULL,
  base_fare DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create route_stations junction table (ordered)
CREATE TABLE public.route_stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
  station_id UUID NOT NULL REFERENCES public.stations(id) ON DELETE CASCADE,
  sequence_order INTEGER NOT NULL,
  distance_from_start_km DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(route_id, station_id),
  UNIQUE(route_id, sequence_order)
);

-- Create schedules table
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  frequency_minutes INTEGER NOT NULL,
  active_days TEXT[] NOT NULL DEFAULT ARRAY['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  route_id UUID NOT NULL REFERENCES public.routes(id),
  source_station_id UUID NOT NULL REFERENCES public.stations(id),
  destination_station_id UUID NOT NULL REFERENCES public.stations(id),
  fare DECIMAL(10, 2) NOT NULL,
  qr_code TEXT NOT NULL,
  journey_date DATE NOT NULL,
  journey_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL UNIQUE REFERENCES public.tickets(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_status public.payment_status NOT NULL DEFAULT 'PENDING',
  payment_method TEXT NOT NULL DEFAULT 'DUMMY',
  transaction_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create transaction_history table
CREATE TABLE public.transaction_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status public.payment_status NOT NULL,
  transaction_date TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'INFO',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transaction_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for stations (public read)
CREATE POLICY "Anyone can view stations" ON public.stations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only admins can manage stations" ON public.stations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for routes (public read)
CREATE POLICY "Anyone can view routes" ON public.routes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only admins can manage routes" ON public.routes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for route_stations (public read)
CREATE POLICY "Anyone can view route_stations" ON public.route_stations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only admins can manage route_stations" ON public.route_stations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for schedules (public read)
CREATE POLICY "Anyone can view schedules" ON public.schedules FOR SELECT TO authenticated USING (true);
CREATE POLICY "Only admins can manage schedules" ON public.schedules FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for tickets
CREATE POLICY "Users can view their own tickets" ON public.tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own tickets" ON public.tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all tickets" ON public.tickets FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = payments.ticket_id AND tickets.user_id = auth.uid())
);
CREATE POLICY "Users can create payments" ON public.payments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.tickets WHERE tickets.id = payments.ticket_id AND tickets.user_id = auth.uid())
);
CREATE POLICY "Admins can view all payments" ON public.payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for transaction_history
CREATE POLICY "Users can view their own transactions" ON public.transaction_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all transactions" ON public.transaction_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can create notifications" ON public.notifications FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'ADMIN')
);

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'USER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON public.routes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Seed data: Create sample stations
INSERT INTO public.stations (name, code, latitude, longitude) VALUES
('Versova', 'VER', 19.1386, 72.8139),
('Andheri West', 'ADH', 19.1180, 72.8469),
('Ghatkopar', 'GHK', 19.0861, 72.9081),
('Dadar', 'DDR', 19.0189, 72.8437),
('Churchgate', 'CHG', 18.9322, 72.8264),
('Bandra', 'BND', 19.0596, 72.8295),
('Kurla', 'KUR', 19.0656, 72.8795),
('Chembur', 'CHM', 19.0624, 72.8990);

-- Seed data: Create sample routes
INSERT INTO public.routes (name, distance_km, base_fare) VALUES
('Blue Line', 25.5, 30.00),
('Red Line', 30.2, 35.00),
('Green Line', 18.7, 25.00);

-- Get route and station IDs for seeding route_stations
DO $$
DECLARE
  blue_line_id UUID;
  red_line_id UUID;
  green_line_id UUID;
  versova_id UUID;
  andheri_id UUID;
  ghatkopar_id UUID;
  dadar_id UUID;
  churchgate_id UUID;
BEGIN
  SELECT id INTO blue_line_id FROM public.routes WHERE name = 'Blue Line';
  SELECT id INTO red_line_id FROM public.routes WHERE name = 'Red Line';
  SELECT id INTO green_line_id FROM public.routes WHERE name = 'Green Line';
  
  SELECT id INTO versova_id FROM public.stations WHERE code = 'VER';
  SELECT id INTO andheri_id FROM public.stations WHERE code = 'ADH';
  SELECT id INTO ghatkopar_id FROM public.stations WHERE code = 'GHK';
  SELECT id INTO dadar_id FROM public.stations WHERE code = 'DDR';
  SELECT id INTO churchgate_id FROM public.stations WHERE code = 'CHG';

  -- Blue Line stations
  INSERT INTO public.route_stations (route_id, station_id, sequence_order, distance_from_start_km) VALUES
  (blue_line_id, versova_id, 1, 0),
  (blue_line_id, andheri_id, 2, 8.5),
  (blue_line_id, dadar_id, 3, 15.2),
  (blue_line_id, ghatkopar_id, 4, 25.5);

  -- Red Line stations
  INSERT INTO public.route_stations (route_id, station_id, sequence_order, distance_from_start_km) VALUES
  (red_line_id, churchgate_id, 1, 0),
  (red_line_id, dadar_id, 2, 12.0),
  (red_line_id, ghatkopar_id, 3, 30.2);

  -- Create sample schedules
  INSERT INTO public.schedules (route_id, departure_time, arrival_time, frequency_minutes) VALUES
  (blue_line_id, '06:00:00', '07:30:00', 15),
  (red_line_id, '05:30:00', '07:00:00', 20),
  (green_line_id, '06:30:00', '07:45:00', 25);
END $$;