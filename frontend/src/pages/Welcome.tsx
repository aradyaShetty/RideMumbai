import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Train, Route, Clock, Shield, Smartphone, MapPin, Star, Users, ChevronRight, Play } from 'lucide-react';
export const Welcome = () => {
  const features = [{
    icon: Route,
    title: 'Smart Route Planning',
    description: 'Get the fastest routes with real-time updates and transfer information'
  }, {
    icon: Smartphone,
    title: 'Digital Tickets',
    description: 'Book and store tickets digitally with QR codes for quick boarding'
  }, {
    icon: Clock,
    title: 'Real-time Updates',
    description: 'Live train schedules, delays, and platform information'
  }, {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Safe and secure payment processing with multiple options'
  }];
  const stats = [{
    number: '2M+',
    label: 'Happy Commuters'
  }, {
    number: '12',
    label: 'Active Routes'
  }, {
    number: '50+',
    label: 'Metro Stations'
  }, {
    number: '99.8%',
    label: 'Uptime'
  }];
  return <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Train className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-primary">RideMumbai</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                Your Smart
                <br />
                <span className="text-accent">Metro Companion</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Navigate Mumbai Metro with ease. Plan routes, book tickets, and travel smart with RideMumbai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="xl" variant="accent" asChild>
                  <Link to="/register" className="inline-flex items-center">
                    Start Your Journey
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="xl" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <Card className="shadow-custom-xl">
                  <CardContent className="p-8 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Route Planning</h3>
                    <p className="text-sm text-muted-foreground">Smart navigation</p>
                  </CardContent>
                </Card>
                <Card className="shadow-custom-xl">
                  <CardContent className="p-8 text-center">
                    <Train className="w-8 h-8 text-success mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Digital Tickets</h3>
                    <p className="text-sm text-muted-foreground">QR code boarding</p>
                  </CardContent>
                </Card>
                <Card className="shadow-custom-xl">
                  <CardContent className="p-8 text-center">
                    <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Live Updates</h3>
                    <p className="text-sm text-muted-foreground">Real-time info</p>
                  </CardContent>
                </Card>
                <Card className="shadow-custom-xl">
                  <CardContent className="p-8 text-center">
                    <Shield className="w-8 h-8 text-warning mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Secure Pay</h3>
                    <p className="text-sm text-muted-foreground">Safe transactions</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose RideMumbai?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of metro travel with our smart, user-friendly platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
            const Icon = feature.icon;
            return <Card key={index} className="shadow-custom-lg hover:shadow-custom-xl transition-shadow group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Icon className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Loved by Mumbai Commuters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            name: "Priya Sharma",
            role: "Daily Commuter",
            content: "RideMumbai has made my daily commute so much easier. The route planning is spot-on!",
            rating: 5
          }, {
            name: "Rahul Patel",
            role: "Business Professional",
            content: "Digital tickets and real-time updates have saved me countless hours. Highly recommended!",
            rating: 5
          }, {
            name: "Sneha Iyer",
            role: "Student",
            content: "The app is intuitive and the booking process is super quick. Love the QR code feature!",
            rating: 5
          }].map((testimonial, index) => <Card key={index} className="shadow-custom-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-warning fill-current" />)}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Commute?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of smart commuters who've made the switch to RideMumbai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="accent" asChild>
              <Link to="/register">
                Get Started Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border border-white/20" asChild>
              <Link to="/login">
                Already have an account?
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <Train className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold text-primary">RideMumbai</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 RideMumbai. Making Mumbai move smarter.
            </div>
          </div>
        </div>
      </footer>
    </div>;
};