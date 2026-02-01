import React, { useState } from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { useContent } from '../context/ContentContext';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { DeliveryTiming } from '../types';
import { Textarea } from '../components/common/Textarea';

export const AdminSettings: React.FC = () => {
  const { content, updateContent, isLoading: contentLoading } = useContent();
  const [isSaving, setIsSaving] = useState(false);

  // Local state for form fields to allow editing before saving
  const [localContactDetails, setLocalContactDetails] = useState(content.contactDetails);
  const [localDeliveryTimings, setLocalDeliveryTimings] = useState<DeliveryTiming[]>(content.deliveryTimings);
  const [localThemeColors, setLocalThemeColors] = useState(content.themeColors);
  const [localMetaTitle, setLocalMetaTitle] = useState(content.metaTitle);
  const [localMetaDescription, setLocalMetaDescription] = useState(content.metaDescription);
  const [localMetaKeywords, setLocalMetaKeywords] = useState(content.metaKeywords);

  // Update local state when content from context changes (e.g., on initial load or external update)
  React.useEffect(() => {
    setLocalContactDetails(content.contactDetails);
    setLocalDeliveryTimings(content.deliveryTimings);
    setLocalThemeColors(content.themeColors);
    setLocalMetaTitle(content.metaTitle);
    setLocalMetaDescription(content.metaDescription);
    setLocalMetaKeywords(content.metaKeywords);
  }, [content]);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setLocalContactDetails(prev => ({ ...prev, [id]: value }));
  };

  const handleDeliveryTimingChange = (index: number, field: keyof DeliveryTiming, value: string) => {
    const updatedTimings = [...localDeliveryTimings];
    updatedTimings[index] = { ...updatedTimings[index], [field]: value };
    setLocalDeliveryTimings(updatedTimings);
  };

  const addDeliveryTiming = () => {
    setLocalDeliveryTimings(prev => [...prev, { days: '', time: '' }]);
  };

  const removeDeliveryTiming = (index: number) => {
    setLocalDeliveryTimings(prev => prev.filter((_, i) => i !== index));
  };

  const handleThemeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalThemeColors(prev => ({ ...prev, [id]: value }));
  };

  const handleMetaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'metaTitle') setLocalMetaTitle(value);
    if (id === 'metaDescription') setLocalMetaDescription(value);
    if (id === 'metaKeywords') setLocalMetaKeywords(value);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    await updateContent('contactDetails', localContactDetails);
    await updateContent('deliveryTimings', localDeliveryTimings);
    await updateContent('themeColors', localThemeColors);
    await updateContent('metaTitle', localMetaTitle);
    await updateContent('metaDescription', localMetaDescription);
    await updateContent('metaKeywords', localMetaKeywords);
    setIsSaving(false);
  };

  if (contentLoading) {
    return <div className="text-center py-8 text-lg text-textLight">Loading settings...</div>;
  }

  return (
    <div className="space-y-10">
      <SectionTitle title="Website Settings" subtitle="Global Configuration" className="!text-left !mb-6" />

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input id="name" label="Contact Name" value={localContactDetails.name} onChange={handleContactChange} />
          <Input id="phone" label="Phone" value={localContactDetails.phone} onChange={handleContactChange} />
          <Input id="whatsapp" label="WhatsApp Number" value={localContactDetails.whatsapp} onChange={handleContactChange} />
          <Input id="email" label="Email" value={localContactDetails.email} onChange={handleContactChange} />
          <Textarea id="address" label="Address" value={localContactDetails.address} onChange={handleContactChange} rows={3} />
          <Textarea id="mapEmbedUrl" label="Google Map Embed URL" value={localContactDetails.mapEmbedUrl} onChange={handleContactChange} rows={3} />
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">Delivery Timings</h2>
        <div className="space-y-4">
          {localDeliveryTimings.map((timing, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 items-end border-b pb-4 last:border-b-0 last:pb-0">
              <Input
                id={`days-${index}`}
                label="Days"
                value={timing.days}
                onChange={(e) => handleDeliveryTimingChange(index, 'days', e.target.value)}
                className="flex-grow"
              />
              <Input
                id={`time-${index}`}
                label="Time"
                value={timing.time}
                onChange={(e) => handleDeliveryTimingChange(index, 'time', e.target.value)}
                className="flex-grow"
              />
              <Button onClick={() => removeDeliveryTiming(index)} variant="secondary" className="bg-red-400 hover:bg-red-500">
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addDeliveryTiming} variant="outline" className="mt-4">
            Add Delivery Slot
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">Theme Colors</h2>
        <p className="text-textLight mb-4">Adjust the primary color palette of your website.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(localThemeColors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <label htmlFor={key} className="capitalize text-textDark text-sm font-medium">{key.replace(/([A-Z])/g, ' $1')}:</label>
              <Input
                id={key}
                type="color"
                value={value}
                onChange={handleThemeColorChange}
                className="w-12 h-12 p-1 border rounded-md cursor-pointer"
              />
              <Input
                id={`${key}-hex`}
                type="text"
                value={value}
                onChange={(e) => setLocalThemeColors(prev => ({ ...prev, [key]: e.target.value }))}
                className="flex-grow"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-textDark mb-6">SEO Meta Tags</h2>
        <p className="text-textLight mb-4">Edit meta tags to improve your website's search engine visibility. Note: For a pure client-side React app, these values are used in generated code but might require server-side rendering or pre-rendering for full SEO effectiveness on dynamic content.</p>
        <div className="space-y-4">
          <Input id="metaTitle" label="Meta Title" value={localMetaTitle} onChange={handleMetaChange} />
          <Textarea id="metaDescription" label="Meta Description" value={localMetaDescription} onChange={handleMetaChange} rows={3} />
          <Input id="metaKeywords" label="Meta Keywords (comma-separated)" value={localMetaKeywords} onChange={handleMetaChange} />
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Button onClick={handleSaveAll} isLoading={isSaving} className="w-full text-lg">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
