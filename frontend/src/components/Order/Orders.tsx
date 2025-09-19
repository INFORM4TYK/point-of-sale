import { useEffect, useState } from "react";
import type { Order } from "../../types/Order";
import { getAllOrders, getOrderById } from "../../services/orderService";
import useLoading from "../../hooks/useLoading";
import OrderStackltem from "./parts/OrderStackltem";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { startLoading } = useLoading();
  useEffect(() => {
    const fetchOrders = async () => {
      const stopLoading = startLoading();
      try {
        const ordersSummary = await getAllOrders();

        const ordersWithItems = await Promise.all(
          ordersSummary.map((order) => getOrderById(order.id))
        );

        setOrders(ordersWithItems);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        stopLoading();
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0)
    return (
      <div className="h-screen grid place-items-center text-gray-500">
        Brak zamówień
      </div>
    );
  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-4">Lista zamówień</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <OrderStackltem order={order} />
        ))}
      </ul>
    </div>
  );
};

export default Orders;
