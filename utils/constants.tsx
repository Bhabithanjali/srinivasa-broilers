import { NavItem, DeliveryTiming, SocialLinkType, EditableContent, ContactDetails, ThemeColors } from '../types';
// Fix: Removed React import as JSX is no longer used in this file
// import React from 'react'; // Keep React imported for JSX
// Fix: Removed FaFacebook, FaInstagram, FaWhatsapp imports as they are no longer used here
// import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Facilities', path: '/facilities' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact Us', path: '/contact' },
  { name: 'Admin', path: '/admin' }, // Hidden from public nav, accessible directly
];

export const INITIAL_DELIVERY_TIMINGS: DeliveryTiming[] = [
  { days: 'Monday – Friday', time: '9:00 PM – 7:00 AM' },
  { days: 'Saturday', time: '9:00 PM – 6:00 AM' },
  { days: 'Sunday', time: '10:00 PM – 6:00 AM' },
];

export const INITIAL_CONTACT_DETAILS: ContactDetails = {
  name: 'BABU NAIDU.V',
  phone: '9618656286',
  whatsapp: '919618656286',
  email: 'babunaidu9618@gmail.com',
  address: 'Chittoor, Andhra Pradesh (AP)',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d79.0928!3d13.2081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad460c4927b2c9%3A0x6b8d7c4b4d6e9f1a!2sChittoor%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin', // Placeholder Chittoor map
};

// Fix: Changed icon to string identifiers to resolve JSX-in-TS error
export const SOCIAL_LINKS: SocialLinkType[] = [
  { name: 'Facebook', url: 'https://facebook.com/srinivasabroilers', icon: 'facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/srinivasa_broilers?igsh=c2JjYWZ6cDJreXZj&utm_source=qr', icon: 'instagram' },
  { name: 'WhatsApp', url: `https://wa.me/${INITIAL_CONTACT_DETAILS.whatsapp}?text=Hello%2C%20I%27m%20interested%20in%20your%20hen%20delivery%20service.`, icon: 'whatsapp' },
];

export const ADMIN_PASSWORD = 'password'; // For demonstration purposes

export const INITIAL_THEME_COLORS: ThemeColors = {
  primary: '#10B981', // Emerald 500
  primaryLight: '#34D399', // Emerald 400
  primaryDark: '#059669', // Emerald 600
  secondary: '#F9FAFB', // Gray 50
  textDark: '#1F2937', // Gray 800
  textLight: '#6B7280', // Gray 500
};

export const INITIAL_EDITABLE_CONTENT: EditableContent = {
  homeHeroHeading: 'Fast & Reliable Hen Delivery Service',
  homeDescription: 'SRINIVASA BROILERS is your trusted partner for prompt and efficient hen delivery. We understand the importance of timely service and quality, ensuring your orders are handled with utmost care from our facility to your doorstep.',
  homeServiceHighlights: [
    'Speedy Delivery: Get your orders delivered quickly.',
    'Unmatched Reliability: Consistent and dependable service.',
    'Night Delivery: Flexible timings to suit your schedule.',
    'Quality & Freshness: We ensure every hen is in prime condition.',
  ],
  aboutIntro: 'SRINIVASA BROILERS is dedicated to providing an unparalleled hen delivery experience. Our commitment to timely delivery and customer convenience sets us apart. We serve a wide area in and around Chittoor, Andhra Pradesh, ensuring fresh hens reach you when you need them most.',
  aboutServiceArea: 'Our primary service area includes Chittoor and surrounding regions in Andhra Pradesh. We are continually expanding our reach to serve more customers with our reliable delivery services.',
  servicesList: [
    'On-demand Hen Delivery: Quick service for urgent needs.',
    'Bulk & Small Quantity Orders: Catering to all order sizes.',
    'Scheduled Delivery: Plan your deliveries in advance.',
    'Night-time Delivery: Convenient options for late hours.',
    'Customer-Friendly Service: Our team is here to assist you.',
  ],
  facilitiesList: [
    'Safe Handling: Ensuring the well-being and quality of hens.',
    'Reliable Transport: Specialized vehicles for secure delivery.',
    'Order Tracking Support: Stay informed about your delivery status.',
    'Dedicated Customer Support: Always available to help with your queries.',
  ],
  contactDetails: INITIAL_CONTACT_DETAILS,
  deliveryTimings: INITIAL_DELIVERY_TIMINGS,
  galleryItems: [
    { id: 'g1', imageUrl: '/images/15.jpeg', altText: 'Delivery Vehicle' },
    { id: 'g2', imageUrl: '/images/4.jpeg', altText: 'Packed Hens' },
    { id: 'g3', imageUrl: '/images/5.jpeg', altText: 'Order Handling' },
    { id: 'g4', imageUrl: '/images/6.jpeg', altText: 'Clean Facility' },
    { id: 'g5', imageUrl: '/images/7.jpeg', altText: 'Happy Customer' },
    { id: 'g6', imageUrl: '/images/8.jpeg', altText: 'Efficient Logistics' },
    { id: 'g1', imageUrl: '/images/9.jpeg', altText: 'Delivery Vehicle' },
    { id: 'g2', imageUrl: '/images/10.jpeg', altText: 'Packed Hens' },
    { id: 'g3', imageUrl: '/images/11.jpeg', altText: 'Order Handling' },
    { id: 'g4', imageUrl: '/images/12.jpeg', altText: 'Clean Facility' },
    { id: 'g5', imageUrl: '/images/13.jpeg', altText: 'Happy Customer' },
    { id: 'g2', imageUrl: '/images/3.jpeg', altText: 'Packed Hens' },
  ],
  blogPosts: [
    {
      id: 'b1',
      title: 'The Benefits of Fresh Hen Delivery',
      author: 'Admin',
      date: '2023-10-26',
      imageUrl: '/images/2.jpeg',
      content: 'Discover why fresh hen delivery is crucial for quality and convenience. Our services ensure you always get the best, right at your doorstep, without any hassle. We prioritize hygiene and speed.',
      tags: ['delivery', 'freshness', 'quality'],
    },
    {
      id: 'b2',
      title: 'Understanding Our Night-time Delivery',
      author: 'Admin',
      date: '2023-11-15',
      imageUrl: '/images/1.jpeg',
      content: 'Our night-time delivery option is designed for maximum flexibility. Learn how you can schedule your hen deliveries to perfectly fit your busy lifestyle, making sure you never miss out.',
      tags: ['delivery', 'convenience', 'night service'],
    },
  ],
  themeColors: INITIAL_THEME_COLORS,
  metaTitle: "SRINIVASA BROILERS - Fast & Reliable Hen Delivery",
  metaDescription: "SRINIVASA BROILERS - Your trusted partner for fast, reliable, and convenient hen delivery services in Chittoor, Andhra Pradesh. Order online today!",
  metaKeywords: "hen delivery, broiler delivery, chicken order, online poultry, Chittoor, Andhra Pradesh, SRINIVASA BROILERS",
};