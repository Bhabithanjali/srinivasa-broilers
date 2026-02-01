import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { SectionTitle } from '../components/common/SectionTitle';
import { Button } from '../components/common/Button';
import { useContent } from '../context/ContentContext';

export const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { content } = useContent();
  const contactDetails = content.contactDetails;

  const fetchOrder = useCallback(async () => {
    if (!orderId) {
      setError('Order ID is missing.');
      setIsLoading(false);
      return;
    }
    try {
      const fetchedOrder = await orderService.getOrderById(orderId);
      if (fetchedOrder) {
        setOrder(fetchedOrder);
      } else {
        setError('Order not found.');
      }
    } catch (err) {
      console.error('Failed to fetch order:', err);
      setError('Failed to load order details.');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-textLight min-h-screen">
        Loading order details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-red-600 min-h-screen">
        <p className="text-2xl font-semibold mb-4">Error: {error}</p>
        <Link to="/contact" className="text-primary hover:underline">
          Go back to Contact Us
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-textLight min-h-screen">
        <p className="text-2xl font-semibold mb-4">No order found.</p>
        <Link to="/contact" className="text-primary hover:underline">
          Go back to Contact Us to place an order
        </Link>
      </div>
    );
  }

  const orderWhatsAppMessage = encodeURIComponent(
    `Hello SRINIVASA BROILERS, I have placed an order and would like to confirm. My Order ID is ${order.id}. ` +
    `Customer Name: ${order.customerName}, Contact: ${order.customerContactNumber}, ` +
    `Number of Hens: ${order.numberOfHens}. Special Instructions: ${order.specialInstructions || 'None'}.`
  );
  const whatsappLink = `https://wa.me/${contactDetails.whatsapp}?text=${orderWhatsAppMessage}`;

  const orderEmailSubject = encodeURIComponent(`Order Confirmation & Details - #${order.id}`);
  const orderEmailBody = encodeURIComponent(
    `Dear SRINIVASA BROILERS Team,\n\n` +
    `I have placed an order with the following details:\n\n` +
    `Order ID: ${order.id}\n` +
    `Customer Name: ${order.customerName}\n` +
    `Contact Number: ${order.customerContactNumber}\n` +
    `Number of Hens: ${order.numberOfHens}\n` +
    `Special Instructions: ${order.specialInstructions || 'None'}\n` +
    `Order Date: ${new Date(order.orderDate).toLocaleString()}\n` +
    `Status: ${order.status}\n\n` +
    `Please confirm receipt and provide any further updates.\n\n` +
    `Thank you!`
  );
  const emailLink = `mailto:${contactDetails.email}?subject=${orderEmailSubject}&body=${orderEmailBody}`;

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <SectionTitle title="Order Confirmed!" subtitle="Thank You for Your Order" />

        <div className="bg-white shadow-lg rounded-xl p-8 md:p-12 max-w-2xl mx-auto">
          <p className="text-2xl font-bold text-primary-dark mb-4">Your Order ID: <span className="text-textDark">{order.id}</span></p>
          <p className="text-lg text-textDark mb-6">We have received your order and will process it shortly. Our team will contact you for further confirmation.</p>

          <div className="text-left space-y-3 mb-8 text-lg">
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Contact Number:</strong> {order.customerContactNumber}</p>
            <p><strong>Number of Hens:</strong> {order.numberOfHens}</p>
            <p><strong>Special Instructions:</strong> {order.specialInstructions || 'N/A'}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Status:</strong> <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">{order.status}</span></p>
          </div>

          <p className="text-xl font-semibold text-textDark mb-4">Have Questions or want to confirm?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => window.open(whatsappLink, '_blank')}
              className="flex items-center justify-center space-x-2"
            >
              <img src="https://img.icons8.com/color/48/000000/whatsapp--v1.png" alt="WhatsApp" className="w-6 h-6" />
              <span>Confirm via WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = emailLink}
              className="flex items-center justify-center space-x-2"
            >
              <img src="https://img.icons8.com/color/48/000000/filled-message.png" alt="Email" className="w-6 h-6" />
              <span>Send Email</span>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <Link to="/" className="text-primary hover:underline font-semibold">
              &larr; Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
