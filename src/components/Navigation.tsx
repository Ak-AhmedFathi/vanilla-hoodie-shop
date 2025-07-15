import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
import { gsap } from 'gsap';

interface NavigationProps {
  cartCount: number;
  onCartClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      // GSAP animation for menu opening
      gsap.fromTo(menuRef.current, 
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    } else {
      // GSAP animation for menu closing
      gsap.to(menuRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setIsMenuOpen(false)
      });
    }
  };

  const menuItems = [
    { name: 'Men', href: '/men' },
    { name: 'Women', href: '/women' },
    { name: 'Accessories', href: '/accessories' },
    { name: 'Sale', href: '/sale' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="font-playfair text-2xl font-bold text-primary tracking-tight">
                Vanilla Hoodies
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              <button className="text-foreground hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </button>
              
              <button 
                onClick={onCartClick}
                className="relative text-foreground hover:text-primary transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="text-foreground hover:text-primary transition-colors">
                <User className="h-5 w-5" />
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  ref={menuIconRef}
                  onClick={toggleMenu}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background shadow-xl md:hidden"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-playfair text-xl font-semibold text-primary">Menu</h2>
              <button
                onClick={toggleMenu}
                className="text-foreground hover:text-primary transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 py-6">
              {menuItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={toggleMenu}
                  className="block px-6 py-4 text-lg font-medium text-foreground hover:text-primary hover:bg-muted transition-all"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="p-6 border-t">
              <Link
                to="/account"
                onClick={toggleMenu}
                className="block w-full text-center py-3 px-4 bg-primary text-primary-foreground font-medium tracking-wide uppercase text-sm hover:bg-primary/90 transition-colors"
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default Navigation;