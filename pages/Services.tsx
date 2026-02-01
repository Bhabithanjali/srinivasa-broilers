import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { useContent } from '../context/ContentContext';
import { MdDeliveryDining, MdOutlineSchedule, MdNightlight, MdGroup, MdVerifiedUser } from 'react-icons/md';

export const Services: React.FC = () => {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-textLight">Loading content...</div>;
  }

  const serviceIcons = [
    <MdDeliveryDining className="text-primary text-5xl mb-4" />,
    <MdGroup className="text-primary text-5xl mb-4" />,
    <MdOutlineSchedule className="text-primary text-5xl mb-4" />,
    <MdNightlight className="text-primary text-5xl mb-4" />,
    <MdVerifiedUser className="text-primary text-5xl mb-4" />,
  ];

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle title="Our Services" subtitle="What We Offer" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.servicesList.map((service, index) => (
            <div key={index} className="bg-gray-50 shadow-lg rounded-xl p-8 text-center border-t-4 border-primary hover:shadow-xl transition-all duration-300">
              <div className="flex justify-center mb-4">
                {serviceIcons[index % serviceIcons.length]}
              </div>
              <div className="editable-content">
                <h3 className="text-xl md:text-2xl font-bold text-textDark mb-4">
                    <span className="admin-editable" data-content-key="servicesList" data-item-index={index}>{service.split(':')[0]}</span>
                </h3>
                <p className="text-textLight leading-relaxed">
                    <span className="admin-editable" data-content-key="servicesList" data-item-index={index}>{service.split(':')[1]?.trim()}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl text-textDark max-w-3xl mx-auto">
            We are committed to providing flexible, reliable, and customer-centric hen delivery solutions tailored to your needs. Experience the difference with SRINIVASA BROILERS.
          </p>
        </div>
      </div>
    </div>
  );
};
