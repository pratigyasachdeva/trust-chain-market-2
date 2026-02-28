import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, Wallet, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRole, setRole, useStore } from "@/lib/store";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { role } = useStore();

  const links = [
    { to: "/", label: "Home" },
    { to: "/marketplace", label: "Marketplace" },
    { to: "/orders", label: "My Orders" },
    { to: "/profile", label: "Profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="font-display text-lg font-bold text-foreground">
            TrustChain <span className="text-gradient">Market</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors ${
                isActive(l.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Role Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs border-border/60">
                <span className="text-muted-foreground hidden sm:inline">Viewing as:</span>
                <span className="capitalize font-semibold">{role}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRole("buyer")} className={role === "buyer" ? "text-primary" : ""}>
                Buyer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole("seller")} className={role === "seller" ? "text-primary" : ""}>
                Seller
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground border border-border/60 rounded-full px-3 py-1.5">
            <Wallet className="h-3 w-3" />
            <span className="font-mono">0xA7F3...92AC</span>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/50 animate-slide-up">
          <div className="flex flex-col p-4 gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium py-2 ${
                  isActive(l.to) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border/50">
              <Wallet className="h-3 w-3" />
              <span className="font-mono">0xA7F3...92AC</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
