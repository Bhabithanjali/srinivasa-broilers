import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { useContent } from '../context/ContentContext';

export const About: React.FC = () => {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-textLight">Loading content...</div>;
  }

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="About Us" subtitle="Our Story & Mission" />

        <div className="bg-white shadow-lg rounded-xl p-8 md:p-12 mb-10">
          <div className="editable-content">
            <p className="text-lg md:text-xl text-textDark leading-relaxed mb-6">
              <span className="admin-editable" data-content-key="aboutIntro">{content.aboutIntro}</span>
            </p>
          </div>
          <p className="text-lg md:text-xl text-textDark leading-relaxed">
            At SRINIVASA BROILERS, we are more than just a delivery service; we are a promise of freshness, speed, and reliability. Our dedicated team works tirelessly to ensure that every order, whether large or small, is fulfilled with precision and care. We are committed to building lasting relationships with our customers based on trust and exceptional service.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-primary-dark mb-6 text-center">Our Service Area</h3>
          <div className="editable-content">
            <p className="text-lg md:text-xl text-textDark leading-relaxed mb-6 text-center">
              <span className="admin-editable" data-content-key="aboutServiceArea">{content.aboutServiceArea}</span>
            </p>
          </div>
          <p className="text-lg md:text-xl text-textDark leading-relaxed text-center">
            We are proud to serve the bustling communities of Chittoor and extend our reliable services to its vibrant surrounding localities in Andhra Pradesh. Our strategic logistics ensure that we reach you efficiently, maintaining the quality of our products throughout the delivery process.
          </p>
        </div>
      </div>
    </div>
  );
};
