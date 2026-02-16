import { Monitor } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Monitor className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-gradient">TechVault</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for laptops, desktops, and all computer & mobile parts.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link to="/products?category=laptops" className="text-sm text-muted-foreground hover:text-primary transition-colors">Laptops</Link>
              <Link to="/products?category=desktops" className="text-sm text-muted-foreground hover:text-primary transition-colors">Desktops</Link>
              <Link to="/products?category=desktop-parts" className="text-sm text-muted-foreground hover:text-primary transition-colors">Desktop Parts</Link>
              <Link to="/products?category=mobile-parts" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mobile Parts</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Support</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Contact Us</span>
              <span className="text-sm text-muted-foreground">Shipping Info</span>
              <span className="text-sm text-muted-foreground">Returns</span>
              <span className="text-sm text-muted-foreground">FAQ</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-foreground">Company</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">About Us</span>
              <span className="text-sm text-muted-foreground">Privacy Policy</span>
              <span className="text-sm text-muted-foreground">Terms of Service</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2026 TechVault. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
