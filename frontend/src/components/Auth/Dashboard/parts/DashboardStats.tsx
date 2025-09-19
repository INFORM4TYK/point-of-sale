import { useEffect, useState } from "react";
import DashboardStatItem from "./DashboardStatItem";
import { getAllOrders, getOrderById } from "../../../../services/orderService";
import Decimal from "decimal.js";
import { getAllCustomers } from "../../../../services/customerService";

const DashboardStats = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [money, setMoney] = useState("0");

  const [amountProducts, setAmountProducts] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const ordersSummary = await getAllOrders();
        const customers = await getAllCustomers();
        const ordersWithItems = await Promise.all(
          ordersSummary.map((order) => getOrderById(order.id))
        );
        const totalItems = ordersWithItems.reduce((sum, order) => {
          return (
            sum +
            order.items.reduce((itemSum, item) => itemSum + item.amount, 0)
          );
        }, 0);
        const totalMoney = ordersWithItems.reduce((sum, order) => {
          return (
            sum +
            order.items.reduce(
              (itemSum, item) => itemSum + item.amount * Number(item.price),
              0
            )
          );
        }, 0);
        setCustomers(customers.length);
        const normalizedPrice = new Decimal(totalMoney).div(100).toFixed(2);
        setMoney(normalizedPrice);
        setOrders(ordersSummary.length ?? 0);
        setAmountProducts(totalItems);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="flex items-stretch flex-wrap gap-4 ">
      <DashboardStatItem
        loading={loading}
        stats={orders}
        title="Ilość zamówień"
        icon="orders"
      />
      <DashboardStatItem
        loading={loading}
        stats={money}
        title="Zarobek"
        icon="money"
      />
      <DashboardStatItem
        loading={loading}
        stats={customers}
        title="Ilość Klientów"
        icon="customers"
      />
      <DashboardStatItem
        loading={loading}
        stats={amountProducts}
        title="Ilość Produktów"
        icon="sold_products"
      />
    </div>
  );
};

export default DashboardStats;
