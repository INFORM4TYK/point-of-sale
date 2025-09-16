import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useAuth from "../../../hooks/useAuth";
import ProductList from "../../Products/ProductList";
import DashboardSideMenu from "./Common/DashboardSideMenu";

const DashboardContent = () => {
  const router = useNavigate();
  const { loading } = useLoading();
  // const { currentUser, loadingUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "pos" | "products" | "orders" | "clients" | "settings"
  >("dashboard");

  const currentUser = {
    email: "example@gmail.com",
  };
  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <div>Witamy w dashboardzie</div>;
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

      {/* Główny panel */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{activeTab.toUpperCase()}</h1>
          <button>Wyloguj się</button>
        </div>

        <p className="mb-6">
          Jesteś zalogowany jako: <strong>{currentUser.email}</strong>
        </p>

        {renderTab()}
      </main>
    </div>
  );
};

export default DashboardContent;
