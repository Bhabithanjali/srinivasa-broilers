import React, { useState } from 'react';
import { SectionTitle } from '../components/common/SectionTitle';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Button } from '../components/common/Button';
import { useContent } from '../context/ContentContext';
import { DeliveryTimingsCard } from '../components/common/DeliveryTimingsCard';
import {
  FaUser,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export const Contact: React.FC = () => {
  const { content, isLoading } = useContent();

  const contactDetails = content.contactDetails ?? {
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    mapEmbedUrl: '',
  };

  const deliveryTimings = content.deliveryTimings ?? [];

  // ---------------- FORM STATE ----------------
  const [formData, setFormData] = useState({
    customerName: '',
    hensCount: '',
    deliveryTime: '',
    address: '',
    whatsapp: '',
  });

  const [formErrors, setFormErrors] = useState({
    customerName: '',
    hensCount: '',
    whatsapp: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  // ---------------- HANDLERS ----------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { customerName: '', hensCount: '', whatsapp: '' };

    if (!formData.customerName.trim()) {
      errors.customerName = 'Customer name is required';
      isValid = false;
    }

    if (!formData.hensCount.trim()) {
      errors.hensCount = 'Number of hens is required';
      isValid = false;
    }

    if (!formData.whatsapp.trim()) {
      errors.whatsapp = 'WhatsApp number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.whatsapp)) {
      errors.whatsapp = 'Enter a valid 10-digit number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: formData.customerName,
            hensCount: Number(formData.hensCount),
            deliveryTime: formData.deliveryTime || 'Not specified',
            address: formData.address || 'Not specified',
            whatsapp: `91${formData.whatsapp}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      setSubmitSuccess(true);
      setFormData({
        customerName: '',
        hensCount: '',
        deliveryTime: '',
        address: '',
        whatsapp: '',
      });
    } catch (error) {
      console.error(error);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-500">
        Loading content...
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle title="Get in Touch" subtitle="Contact Us" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* CONTACT INFO */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-primary-dark mb-6">
              Our Contact Details
            </h3>

            <address className="not-italic space-y-5 text-gray-700 text-lg">
              <p className="flex items-center">
                <FaUser className="text-primary mr-3 text-2xl" />
                {contactDetails.name}
              </p>
              <p className="flex items-center">
                <FaPhone className="text-primary mr-3 text-2xl" />
                {contactDetails.phone}
              </p>
              <p className="flex items-center">
                <FaWhatsapp className="text-green-600 mr-3 text-2xl" />
                {contactDetails.whatsapp}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="text-primary mr-3 text-2xl" />
                {contactDetails.email}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="text-primary mr-3 text-2xl" />
                {contactDetails.address}
              </p>
            </address>

            <div className="mt-10">
              <DeliveryTimingsCard
                timings={deliveryTimings}
                title="Our Delivery Timings"
              />
            </div>
          </div>

          {/* ORDER FORM */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-3xl font-bold text-primary-dark mb-6">
              Place Your Order
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="customerName"
                label="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
                error={formErrors.customerName}
                required
              />

              <Input
                id="hensCount"
                label="Number of Hens"
                type="number"
                value={formData.hensCount}
                onChange={handleChange}
                error={formErrors.hensCount}
                required
              />

              <Input
                id="deliveryTime"
                label="Preferred Delivery Time (Optional)"
                value={formData.deliveryTime}
                onChange={handleChange}
              />

              <Textarea
                id="address"
                label="Delivery Address (Optional)"
                value={formData.address}
                onChange={handleChange}
                rows={3}
              />

              {/* WHATSAPP */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Customer WhatsApp Number
                </label>
                <div className="flex">
                  <span className="px-3 flex items-center bg-gray-100 border border-r-0 rounded-l-md">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        whatsapp: e.target.value.replace(/\D/g, ''),
                      }))
                    }
                    maxLength={10}
                    placeholder="10-digit number"
                    className="w-full border rounded-r-md px-3 py-2"
                    required
                  />
                </div>
                {formErrors.whatsapp && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.whatsapp}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Submit Order
              </Button>

              {submitSuccess && (
                <p className="text-green-600 text-center">
                  Order placed successfully!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
