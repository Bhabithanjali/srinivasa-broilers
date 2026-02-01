import React, { useState, useEffect, useCallback } from 'react';
import { Order } from '../../types';
import { orderService } from '../../services/orderService';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface OrderTableProps {
  initialOrders?: Order[];
}

export const OrderTable: React.FC<OrderTableProps> = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    const fetchedOrders = await orderService.getOrders();
    setOrders(fetchedOrders);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    setIsLoading(true);
    await orderService.updateOrderStatus(orderId, status);
    fetchOrders(); // Re-fetch orders to update the list
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getOrderStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-lg text-textLight">Loading orders...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h3 className="text-2xl font-bold text-textDark mb-4">Manage Orders</h3>
      {orders.length === 0 ? (
        <p className="text-center text-textLight py-4">No orders placed yet.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hens
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textDark">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textDark">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textDark">{order.numberOfHens}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-textDark">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => viewOrderDetails(order)} variant="outline">View</Button>
                    {order.status === 'Pending' && (
                      <Button size="sm" onClick={() => handleUpdateStatus(order.id, 'Confirmed')}>Confirm</Button>
                    )}
                    {order.status === 'Confirmed' && (
                      <Button size="sm" onClick={() => handleUpdateStatus(order.id, 'Delivered')}>Deliver</Button>
                    )}
                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                      <Button size="sm" variant="secondary" onClick={() => handleUpdateStatus(order.id, 'Cancelled')} className="bg-red-400 hover:bg-red-500">Cancel</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedOrder && (
        <Modal isOpen={isModalOpen} onClose={closeModal} title={`Order Details: ${selectedOrder.id}`}>
          <div className="space-y-3">
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Contact Number:</strong> <a href={`tel:${selectedOrder.customerContactNumber}`} className="text-primary-dark hover:underline">{selectedOrder.customerContactNumber}</a></p>
            <p><strong>Number of Hens:</strong> {selectedOrder.numberOfHens}</p>
            <p><strong>Special Instructions:</strong> {selectedOrder.specialInstructions || 'N/A'}</p>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
            <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getOrderStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>

            <div className="mt-4 flex flex-col space-y-2">
              <h4 className="font-semibold text-textDark">Share Order Details:</h4>
              <Button
                variant="outline"
                onClick={() => {
                  const message = `Order #${selectedOrder.id} for ${selectedOrder.customerName} (${selectedOrder.customerContactNumber}): ${selectedOrder.numberOfHens} hens. Instructions: ${selectedOrder.specialInstructions || 'None'}.`;
                  window.open(`https://wa.me/${selectedOrder.customerContactNumber}?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                Share via WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const subject = `Order Details for Order #${selectedOrder.id}`;
                  const body = `Dear ${selectedOrder.customerName},\n\nYour order details are as follows:\nOrder ID: ${selectedOrder.id}\nNumber of Hens: ${selectedOrder.numberOfHens}\nSpecial Instructions: ${selectedOrder.specialInstructions || 'None'}\nOrder Date: ${new Date(selectedOrder.orderDate).toLocaleString()}\nStatus: ${selectedOrder.status}\n\nThank you for choosing SRINIVASA BROILERS!`;
                  window.location.href = `mailto:${selectedOrder.customerContactNumber}@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; // Placeholder email
                }}
              >
                Share via Email
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
