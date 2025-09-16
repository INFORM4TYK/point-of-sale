import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import ProductList from "../../Products/ProductList";
import DashboardSideMenu from "./Common/DashboardSideMenu";

const DashboardContent = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "pos" | "products" | "orders" | "clients" | "settings"
  >("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <ProductList />;
      case "pos":
        return <div>Witamy w POS</div>;
      case "products":
        return <div>Witamy w produkty</div>;
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

export default DashboardContent;
