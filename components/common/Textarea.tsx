import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, error, className = '', ...props }) => {
  const baseStyles = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '';

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-textDark mb-1">
          {label}
        </label>
      )}
      <textarea id={id} className={`${baseStyles} ${errorStyles} ${className}`} {...props} />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
