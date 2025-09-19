import { useState } from "react";
import DashboardContent from "../../components/Auth/Dashboard/DashboardContent";
import ProductList from "../../components/Products/ProductList";
import DashboardSideMenu from "../../components/Auth/Dashboard/parts/DashboardSideMenu";
import Orders from "../../components/Order/Orders";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "pos" | "products" | "orders" | "clients" | "settings"
  >("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;

      case "products":
        return <ProductList />;
      case "orders":
        return <Orders />;
      case "clients":
        return <div>Witamy w klienci</div>;
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
