import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sprout,
  Home,
  Stethoscope,
  Database,
  BookOpen,
  Info,
  Menu,
  X,
} from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const navItems = [
    { label: "Home", to: "/", icon: Home },
    { label: "Diagnose", to: "/diagnose", icon: Stethoscope },
    { label: "Dataset", to: "/dataset", icon: Database },
    { label: "Documentation", to: "/docs", icon: BookOpen },
    { label: "About", to: "/about", icon: Info },
  ];

  return (
    <header className="fixed inset-x-0 top-0 w-full z-50 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900/90 backdrop-blur-sm shadow-lg">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <Link
            to="/"
            aria-label="AgroScan Home"
            className="flex items-center gap-2.5 group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-lime-400/10 group-hover:bg-lime-400/20 transition-colors duration-200">
              <Sprout 
                size={24} 
                className="text-lime-400" 
                strokeWidth={2.5} 
              />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-bold tracking-tight text-white">
                Agro
              </span>
              <span className="text-2xl font-bold tracking-tight text-lime-400">
                Scan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, to, icon: Icon }) => {
              const isActive = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    font-medium text-sm transition-all duration-200
                    ${
                      isActive
                        ? "text-lime-400 bg-white/10"
                        : "text-white/90 hover:text-lime-300 hover:bg-white/5"
                    }
                  `}
                >
                  <Icon size={18} strokeWidth={2} />
                  <span>{label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-lime-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2.5 rounded-lg text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-lime-400/50"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <nav className="md:hidden border-t border-white/10 bg-emerald-900/95 backdrop-blur-sm">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ label, to, icon: Icon }) => {
                const isActive = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      font-medium text-sm transition-all duration-200
                      ${
                        isActive
                          ? "text-lime-400 bg-white/10"
                          : "text-white/90 hover:text-lime-300 hover:bg-white/5"
                      }
                    `}
                  >
                    <Icon size={20} strokeWidth={2} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
