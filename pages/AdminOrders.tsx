import React, { useEffect, useState } from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

interface Order {
  customerName: string;
  hensCount: string;
  deliveryTime: string;
  address: string;
  whatsapp: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders & auto-cancel after 18 hours
  useEffect(() => {
    const savedOrders: Order[] = JSON.parse(
      localStorage.getItem('orders') || '[]'
    );

    const now = new Date().getTime();
    let changed = false;

    const updatedOrders = savedOrders.map((order) => {
      if (
        order.status === 'Pending' &&
        now - new Date(order.createdAt).getTime() > 18 * 60 * 60 * 1000
      ) {
        // Open WhatsApp cancel message
        const cancelMsg = `Hello ${order.customerName},
Your order could not be completed within 18 hours and has been CANCELLED.
Please contact us to place a new order.`;

        window.open(
          `https://wa.me/${order.whatsapp}?text=${encodeURIComponent(cancelMsg)}`,
          '_blank'
        );

        changed = true;
        return { ...order, status: 'Cancelled' };
      }
      return order;
    });

    if (changed) {
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }

    setOrders(updatedOrders);
  }, []);

  // Mark order as completed
  const markCompleted = (index: number) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = 'Completed';

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    const order = updatedOrders[index];

    const message = `Hello ${order.customerName},
Your order for ${order.hensCount} hens has been COMPLETED successfully.
Thank you for choosing us.`;

    window.open(
      `https://wa.me/${order.whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  // Delete order
  const deleteOrder = (index: number) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Customer Orders"
        subtitle="Manage all orders"
        className="!text-left"
      />

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders yet</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">Customer Name</th>
                <th className="border p-3">No. of Hens</th>
                <th className="border p-3">Delivery Time</th>
                <th className="border p-3">Address</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Date & Time</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3">{order.customerName}</td>
                  <td className="border p-3">{order.hensCount}</td>
                  <td className="border p-3">{order.deliveryTime}</td>
                  <td className="border p-3">{order.address}</td>

                  <td className="border p-3 font-semibold">
                    {order.status === 'Pending' && (
                      <span className="text-orange-600">Pending</span>
                    )}
                    {order.status === 'Completed' && (
                      <span className="text-green-600">Completed ✔</span>
                    )}
                    {order.status === 'Cancelled' && (
                      <span className="text-red-600">Cancelled ✖</span>
                    )}
                  </td>

                  <td className="border p-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="border p-3 text-center space-x-2">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => markCompleted(index)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        title="Mark as Completed"
                      >
                        ✔
                      </button>
                    )}

                    <button
                      onClick={() => deleteOrder(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      title="Delete Order"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
