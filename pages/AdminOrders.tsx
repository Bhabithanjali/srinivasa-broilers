import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components/common/SectionTitle";

interface Order {
  _id: string;
  customerName: string;
  hensCount: number;
  deliveryTime: string;
  address: string;
  whatsapp: string;
  status: "Pending" | "Completed" | "Cancelled";
  createdAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || "";


export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/orders`);
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Mark order as completed
  const markCompleted = async (id: string, order: Order) => {
    try {
      await fetch(`${API_URL}/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "Completed" } : o
        )
      );

      const message = `Hello ${order.customerName},
Your order for ${order.hensCount} hens has been COMPLETED successfully.
Thank you for choosing Srinivasa Broilers.`;

      window.open(
        `https://wa.me/${order.whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    } catch (err) {
      alert("Failed to update order");
    }
  };

  // Delete order
  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      await fetch(`${API_URL}/api/orders/${id}`, { method: "DELETE" });
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

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
                <th className="border p-3">Customer</th>
                <th className="border p-3">Hens</th>
                <th className="border p-3">Delivery</th>
                <th className="border p-3">Address</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Date</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border p-3">{order.customerName}</td>
                  <td className="border p-3">{order.hensCount}</td>
                  <td className="border p-3">{order.deliveryTime}</td>
                  <td className="border p-3">{order.address}</td>

                  <td className="border p-3 font-semibold">
                    {order.status === "Pending" && (
                      <span className="text-orange-600">Pending</span>
                    )}
                    {order.status === "Completed" && (
                      <span className="text-green-600">Completed ✔</span>
                    )}
                    {order.status === "Cancelled" && (
                      <span className="text-red-600">Cancelled ✖</span>
                    )}
                  </td>

                  <td className="border p-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>

                  <td className="border p-3 text-center space-x-2">
                    {order.status === "Pending" && (
                      <button
                        onClick={() => markCompleted(order._id, order)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        ✔
                      </button>
                    )}

                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
