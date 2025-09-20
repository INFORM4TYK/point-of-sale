import { useEffect, useState } from "react";
import DashboardContent from "../../components/Auth/Dashboard/DashboardContent";
import ProductList from "../../components/Products/ProductList";
import DashboardSideMenu from "../../components/Auth/Dashboard/parts/DashboardSideMenu";
import Orders from "../../components/Order/Orders";
import Customers from "../../components/Customers/Customers";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
    const location = useLocation();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "pos" | "products" | "orders" | "clients" | "settings"
  >("dashboard");
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") as
      | "dashboard"
      | "pos"
      | "products"
      | "orders"
      | "clients"
      | "settings"
      | null;

    if (tab) setActiveTab(tab);
  }, [location.search]);

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;

      case "products":
        return <ProductList />;
      case "orders":
        return <Orders />;
      case "clients":
        return <Customers />;
      default:
        return <DashboardContent />;
    }
  };
  return (
    <div className="w-full h-screen flex">
      <DashboardSideMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1  overflow-auto">{renderTab()}</main>
    </div>
  );
};

export default Dashboard;
