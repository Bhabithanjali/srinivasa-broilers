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

  const [errors, setErrors] = useState({
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
    setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { customerName: '', hensCount: '', whatsapp: '' };

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name required';
      valid = false;
    }

    if (!formData.hensCount.trim()) {
      newErrors.hensCount = 'Number of hens required';
      valid = false;
    }

    if (!/^\d{10}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Enter valid 10-digit WhatsApp number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('✅ SUBMIT CLICKED');

    if (!validateForm()) {
      setSubmitSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      console.log('API URL:', API_URL);

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          hensCount: Number(formData.hensCount),
          deliveryTime: formData.deliveryTime || 'Not specified',
          address: formData.address || 'Not specified',
          whatsapp: `91${formData.whatsapp}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      setSubmitSuccess(true);
      setFormData({
        customerName: '',
        hensCount: '',
        deliveryTime: '',
        address: '',
        whatsapp: '',
      });
    } catch (err) {
      console.error(err);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-gray-500">
        Loading...
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
            <h3 className="text-2xl font-bold mb-4">Our Contact Details</h3>

            <address className="not-italic space-y-3 text-gray-700">
              <p className="flex items-center">
                <FaUser className="mr-3" /> {contactDetails.name}
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-3" /> {contactDetails.phone}
              </p>
              <p className="flex items-center">
                <FaWhatsapp className="mr-3 text-green-600" />{' '}
                {contactDetails.whatsapp}
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-3" /> {contactDetails.email}
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-3" /> {contactDetails.address}
              </p>
            </address>

            <div className="mt-6">
              <DeliveryTimingsCard
                timings={deliveryTimings}
                title="Delivery Timings"
              />
            </div>
          </div>

          {/* ORDER FORM */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Place Your Order</h3>

            {/* ✅ FORM START */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="customerName"
                label="Customer Name"
                value={formData.customerName}
                onChange={handleChange}
                error={errors.customerName}
                required
              />

              <Input
                id="hensCount"
                label="Number of Hens"
                type="number"
                value={formData.hensCount}
                onChange={handleChange}
                error={errors.hensCount}
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
              />

              {/* WhatsApp */}
              <div>
                <label className="block mb-1">WhatsApp Number</label>
                <div className="flex">
                  <span className="px-3 bg-gray-100 border border-r-0 rounded-l">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        whatsapp: e.target.value.replace(/\D/g, ''),
                      })
                    }
                    maxLength={10}
                    className="w-full border rounded-r px-3 py-2"
                    required
                  />
                </div>
                {errors.whatsapp && (
                  <p className="text-red-500 text-sm">{errors.whatsapp}</p>
                )}
              </div>

              {/* ✅ SUBMIT BUTTON MUST BE INSIDE FORM */}
              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                Submit Order
              </Button>

              {submitSuccess === true && (
                <p className="text-green-600 text-center">
                  Order placed successfully ✅
                </p>
              )}

              {submitSuccess === false && (
                <p className="text-red-600 text-center">
                  Failed to place order ❌
                </p>
              )}
            </form>
            {/* ✅ FORM END */}
          </div>
        </div>
      </div>
    </div>
  );
};
