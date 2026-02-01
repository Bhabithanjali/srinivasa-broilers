import React from 'react';
import { DeliveryTiming } from '../../types';

interface DeliveryTimingsCardProps {
  timings: DeliveryTiming[];
  title?: string;
  className?: string;
}

export const DeliveryTimingsCard: React.FC<DeliveryTimingsCardProps> = ({ timings, title = 'Delivery Timings', className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-primary-dark mb-4 text-center">{title}</h3>
      <ul className="space-y-3">
        {timings.map((item, index) => (
          <li key={index} className="flex justify-between items-center text-textDark">
            <span className="font-semibold text-lg">{item.days}</span>
            <span className="text-lg bg-primary/10 px-3 py-1 rounded-full">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
