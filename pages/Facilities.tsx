import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { useContent } from '../context/ContentContext';
import { FaShieldAlt, FaTruck, FaMapMarkedAlt, FaHeadset } from 'react-icons/fa';

export const Facilities: React.FC = () => {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-textLight">Loading content...</div>;
  }

  const facilityIcons = [
    <FaShieldAlt className="text-primary text-5xl mb-4" />,
    <FaTruck className="text-primary text-5xl mb-4" />,
    <FaMapMarkedAlt className="text-primary text-5xl mb-4" />,
    <FaHeadset className="text-primary text-5xl mb-4" />,
  ];

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Commitment to Excellence" subtitle="Facilities & Support" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.facilitiesList.map((facility, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-8 text-center border-t-4 border-primary hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-4">
                {facilityIcons[index % facilityIcons.length]}
              </div>
              <div className="editable-content">
                <h3 className="text-xl md:text-2xl font-bold text-textDark mb-4">
                    <span className="admin-editable" data-content-key="facilitiesList" data-item-index={index}>{facility.split(':')[0]}</span>
                </h3>
                <p className="text-textLight leading-relaxed">
                    <span className="admin-editable" data-content-key="facilitiesList" data-item-index={index}>{facility.split(':')[1]?.trim()}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl text-textDark max-w-3xl mx-auto">
            We invest in state-of-the-art facilities and robust support systems to guarantee the highest standards of safety, efficiency, and customer satisfaction in every hen delivery.
          </p>
        </div>
      </div>
    </div>
  );
};
