import React from 'react';

export interface NavItem {
  name: string;
  path: string;
}

export interface DeliveryTiming {
  days: string;
  time: string;
}

export interface SocialLinkType {
  name: string;
  url: string;
  // Fix: Changed icon type to string to store icon identifiers
  icon: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerContactNumber: string;
  numberOfHens: number;
  specialInstructions?: string;
  orderDate: string;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled';
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  altText: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string;
  tags: string[];
}

export interface ContactDetails {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  textDark: string;
  textLight: string;
}

export interface EditableContent {
  homeHeroHeading: string;
  homeDescription: string;
  homeServiceHighlights: string[];
  aboutIntro: string;
  aboutServiceArea: string;
  servicesList: string[];
  facilitiesList: string[];
  contactDetails: ContactDetails;
  deliveryTimings: DeliveryTiming[];
  galleryItems: GalleryItem[];
  blogPosts: BlogPost[];
  themeColors: ThemeColors;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface UpdateContentPayload {
  key: keyof EditableContent;
  value: any;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export interface ContentContextType {
  content: EditableContent;
  updateContent: (key: keyof EditableContent, value: any) => void;
  isLoading: boolean;
}