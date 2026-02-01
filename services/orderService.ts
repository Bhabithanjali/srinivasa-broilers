import { Order } from '../types';

const ORDERS_STORAGE_KEY = 'srinivasaBroilersOrders';

interface OrderService {
  submitOrder: (order: Omit<Order, 'id' | 'orderDate' | 'status'>) => Promise<Order>;
  getOrders: () => Promise<Order[]>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<Order | null>;
  getOrderById: (orderId: string) => Promise<Order | null>;
}

const getStoredOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse stored orders, returning empty array:', error);
    return [];
  }
};

const saveOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders to localStorage:', error);
  }
};

export const orderService: OrderService = {
  submitOrder: async (orderData) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const orders = getStoredOrders();
    const newOrder: Order = {
      id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      orderDate: new Date().toISOString(),
      status: 'Pending',
      ...orderData,
    };
    orders.push(newOrder);
    saveOrders(orders);
    return newOrder;
  },

  getOrders: async () => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return getStoredOrders();
  },

  updateOrderStatus: async (orderId, status) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    const orders = getStoredOrders();
    const index = orders.findIndex(order => order.id === orderId);
    if (index > -1) {
      orders[index] = { ...orders[index], status };
      saveOrders(orders);
      return orders[index];
    }
    return null;
  },

  getOrderById: async (orderId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    const orders = getStoredOrders();
    return orders.find(order => order.id === orderId) || null;
  }
};
