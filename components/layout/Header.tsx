import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
    // Smooth scroll to top on route change (optional, but good for SPAs)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeLinkClass = 'text-primary border-b-2 border-primary';
  const defaultLinkClass = 'text-textDark hover:text-primary transition-colors duration-200';
  const mobileLinkClass = 'block px-4 py-2 text-textDark hover:bg-gray-100 hover:text-primary transition-colors duration-200';

  return (
    <header className={`sticky top-0 z-40 w-full bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
  <img
    src="/images/logo.jpeg"
    alt="Srinivasa Broilers Logo"
    className={`w-auto transition-all duration-300 ${
      isScrolled ? 'h-10' : 'h-14'
    }`}
  />
  <span className="text-2xl font-extrabold text-primary-dark tracking-wide">
    SRINIVASA BROILERS
  </span>
</Link>


        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {/* Removed the filter to include 'Admin' in public navigation */}
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`${defaultLinkClass} ${location.pathname === item.path ? activeLinkClass : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-textDark focus:outline-none focus:ring-2 focus:ring-primary rounded-md p-2">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white bg-opacity-95 z-30 flex flex-col items-center justify-center space-y-4 pt-16">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-textDark focus:outline-none text-4xl">
            &times;
          </button>
          <ul className="w-full text-center">
            {/* Removed the filter to include 'Admin' in public navigation */}
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`${mobileLinkClass} ${location.pathname === item.path ? 'bg-primary/10 font-bold' : ''}`}
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};