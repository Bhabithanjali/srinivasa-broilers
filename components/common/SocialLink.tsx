import React from 'react';
// Fix: Import specific icon components for dynamic rendering
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

interface SocialLinkProps {
  url: string;
  // Fix: Changed icon type to string
  icon: string;
  name: string;
  className?: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ url, icon, name, className = '' }) => {
  // Fix: Map string icon names to actual React icon components
  const IconComponent = () => {
    switch (icon) {
      case 'facebook':
        return <FaFacebook />;
      case 'instagram':
        return <FaInstagram />;
      case 'whatsapp':
        return <FaWhatsapp />;
      default:
        return null; // Or a default icon
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className={`text-3xl text-gray-700 hover:text-primary transition-colors duration-200 ${className}`}
    >
      {/* Fix: Render the dynamically selected IconComponent */}
      <IconComponent />
    </a>
  );
};