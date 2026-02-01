import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoginForm } from './LoginForm';
import { Button } from '../common/Button';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Orders', path: '/admin/orders' },
    { name: 'Gallery', path: '/admin/gallery' },
    { name: 'Blog', path: '/admin/blog' },
    { name: 'Settings', path: '/admin/settings' },
  ];

  if (!isAuthenticated) {
    if (!showLoginModal) {
      setShowLoginModal(true); // Open login modal if not authenticated
    }
    return <LoginForm isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />;
  }

  // Once authenticated, render the admin dashboard layout
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-textDark text-white p-6 space-y-6 flex flex-col sticky top-0 h-screen">
        <div className="text-2xl font-bold text-primary-light">Admin Panel</div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            {adminNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded-md transition-colors duration-200
                    ${location.pathname === item.path
                      ? 'bg-primary text-white font-semibold'
                      : 'hover:bg-gray-700 text-gray-300'
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button onClick={logout} variant="secondary" className="w-full text-textDark bg-red-400 hover:bg-red-500">
          Logout
        </Button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
};
