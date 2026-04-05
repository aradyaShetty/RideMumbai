import { Link } from 'react-router-dom';
import { Train, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Train className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-primary">RideMumbai</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Your smart companion for Mumbai Metro travel. Quick, reliable, and convenient.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/route-planning" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Route Planning
                </Link>
                <Link to="/booking" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Book Tickets
                </Link>
                <Link to="/history" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Travel History
                </Link>
                <Link to="/profile" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Profile
                </Link>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Safety Guidelines
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>1800-MUMBAI-METRO</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>help@ridemumbai.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2024 RideMumbai. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};