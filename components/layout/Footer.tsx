import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, SOCIAL_LINKS } from '../../utils/constants';
import { SocialLink } from '../common/SocialLink';
import { useContent } from '../../context/ContentContext';
import { DeliveryTimingsCard } from '../common/DeliveryTimingsCard';

export const Footer: React.FC = () => {
  const { content } = useContent();
  const contact = content.contactDetails;
  const deliveryTimings = content.deliveryTimings;

  return (
    <footer className="bg-textDark text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* App Name & Description */}
        <div>
          <h3 className="text-3xl font-extrabold text-primary-light mb-4 tracking-wider">
            SRINIVASA BROILERS
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted partner for prompt and efficient hen delivery. We prioritize quality, speed, and customer convenience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {/* Removed the filter to include 'Admin' in quick links */}
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link to={item.path} className="text-gray-400 hover:text-primary transition-colors duration-200">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
          <address className="not-italic space-y-2 text-gray-400">
            <p><strong>Name:</strong> {contact.name}</p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors duration-200">
                {contact.phone}
              </a>
            </p>
            <p>
              <strong>WhatsApp:</strong>{' '}
              <a href={`https://wa.me/${contact.whatsapp}?text=Hello%2C%20I%27m%20interested%20in%20your%20hen%20delivery%20service.`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
                {contact.whatsapp}
              </a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors duration-200">
                {contact.email}
              </a>
            </p>
            <p><strong>Address:</strong> {contact.address}</p>
          </address>
        </div>

        {/* Delivery Timings */}
        <div>
            <DeliveryTimingsCard timings={deliveryTimings} className="bg-gray-800 text-white shadow-none"/>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-10 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} SRINIVASA BROILERS. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.name} url={link.url} icon={link.icon} name={link.name} className="text-gray-400 hover:text-primary" />
          ))}
        </div>
      </div>
    </footer>
  );
};