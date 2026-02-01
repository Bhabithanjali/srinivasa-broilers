import React from 'react';
import { Button } from '../components/common/Button';
import { DeliveryTimingsCard } from '../components/common/DeliveryTimingsCard';
import { SectionTitle } from '../components/common/SectionTitle';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { content, isLoading } = useContent();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center text-textLight">Loading content...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
  className="relative bg-cover bg-center bg-no-repeat text-white h-[50vh] min-h-[1200px] overflow-hidden"
  style={{ backgroundImage: "url('/images/backgroung.jpeg')" }}
>
  <div className="absolute inset-0 bg-black/60"></div>


        <div className="container mx-auto px-4 text-center z-10 relative h-full flex flex-col justify-center items-center">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            <Link to="/">
              <span className="editable-content">
                <span className="admin-editable" data-content-key="homeHeroHeading">{content.homeHeroHeading}</span>
              </span>
            </Link>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            <span className="editable-content">
              <span className="admin-editable" data-content-key="homeDescription">{content.homeDescription}</span>
            </span>
          </p>
          <Button onClick={() => navigate('/contact')} size="lg" className="bg-white text-primary hover:bg-gray-100">
            Order Now
          </Button>
        </div>
        {/* Abstract shapes for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full -top-16 -left-16 transform rotate-45"></div>
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-24 -right-24 transform -rotate-30"></div>
        </div>
      </section>

      {/* Delivery Timings & Order Prompt */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <SectionTitle
              title="Our Flexible Delivery Schedule"
              subtitle="Timings"
              className="text-center lg:text-left"
            />
            <p className="text-lg text-textLight mb-8">
              We operate during convenient hours to ensure you receive your orders fresh and on time. Check our schedule below:
            </p>
            <Button onClick={() => navigate('/contact')} size="lg">
              Place Your Order Today!
            </Button>
          </div>
          <div className="mx-auto max-w-md w-full">
            <DeliveryTimingsCard
              timings={content.deliveryTimings}
            />
          </div>
        </div>
      </section>

      {/* Service Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Why Choose SRINIVASA BROILERS?"
            subtitle="Our Commitment"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.homeServiceHighlights.map((highlight, index) => (
              <div key={index} className="bg-primary/5 p-6 rounded-lg shadow-md text-center">
                <div className="editable-content">
                  <p className="text-xl font-semibold text-primary-dark mb-2">
                    <span className="admin-editable" data-content-key="homeServiceHighlights" data-item-index={index}>{highlight}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
