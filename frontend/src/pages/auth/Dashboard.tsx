import { useState } from "react";
import DashboardContent from "../../components/Auth/Dashboard/DashboardContent";
import ProductList from "../../components/Products/ProductList";
import DashboardSideMenu from "../../components/Auth/Dashboard/parts/DashboardSideMenu";

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
        return <div>Witamy w zamówienia</div>;
      case "clients":
        return <div>Witamy w klienci</div>;
      case "settings":
        return <div>Witamy w ustawienia</div>;
      default:
        return <div>Witamy</div>;
    }
  };
  return (
    <div className="w-full h-screen flex">
      <DashboardSideMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 sm:p-6 overflow-auto">{renderTab()}</main>
    </div>
  );
};

export default Dashboard;
