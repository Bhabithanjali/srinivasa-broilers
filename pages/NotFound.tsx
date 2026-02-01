import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-primary-dark mb-4">404</h1>
        <h2 className="text-4xl font-bold text-textDark mb-6">Page Not Found</h2>
        <p className="text-lg text-textLight mb-8">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    </div>
  );
};
