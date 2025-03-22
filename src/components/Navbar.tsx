
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isLoggedIn = false; // This will be replaced with actual auth logic

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300 
      ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            TP
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">TrustPay</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/80'}`}
          >
            Home
          </Link>
          <Link 
            to="/features" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/features') ? 'text-primary' : 'text-foreground/80'}`}
          >
            Features
          </Link>
          <Link 
            to="/pricing" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/pricing') ? 'text-primary' : 'text-foreground/80'}`}
          >
            Pricing
          </Link>
          {isLoggedIn ? (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-foreground/80'}`}
              >
                Dashboard
              </Link>
              <Button variant="ghost" className="text-sm font-medium">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-sm font-medium">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="text-sm font-medium">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white/95 backdrop-blur-lg shadow-md animate-fade-in">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link 
              to="/" 
              onClick={closeMenu}
              className={`text-base font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-foreground/80'}`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              onClick={closeMenu}
              className={`text-base font-medium transition-colors hover:text-primary ${isActive('/features') ? 'text-primary' : 'text-foreground/80'}`}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              onClick={closeMenu}
              className={`text-base font-medium transition-colors hover:text-primary ${isActive('/pricing') ? 'text-primary' : 'text-foreground/80'}`}
            >
              Pricing
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={closeMenu}
                  className={`text-base font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-foreground/80'}`}
                >
                  Dashboard
                </Link>
                <Button variant="ghost" className="text-base font-medium justify-start">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="w-full">
                  <Button variant="ghost" className="text-base font-medium w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={closeMenu} className="w-full">
                  <Button className="text-base font-medium w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
