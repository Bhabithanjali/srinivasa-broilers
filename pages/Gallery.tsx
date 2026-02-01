import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { useContent } from '../context/ContentContext';

export const Gallery: React.FC = () => {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-textLight">Loading content...</div>;
  }

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Gallery" subtitle="Moments of Our Service" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {content.galleryItems.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-lg shadow-lg">
              <img
                src={item.imageUrl}
                alt={item.altText}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">{item.altText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
