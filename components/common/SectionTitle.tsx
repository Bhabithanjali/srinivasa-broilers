import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center mb-10 ${className}`}>
      {subtitle && <p className="text-primary-dark font-semibold text-lg mb-2">{subtitle}</p>}
      <h2 className="text-4xl md:text-5xl font-extrabold text-textDark leading-tight">
        {title}
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
    </div>
  );
};
