import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
type SideMenuProps = {
  activeTab: string;
  setActiveTab: (tab: any) => void;
};
const DashboardSideMenu = ({ activeTab, setActiveTab }: SideMenuProps) => {
  const tabs = [
    { key: "dashboard", label: "Panel Główny" },
    { key: "pos", label: "POS" },
    { key: "products", label: "Produkty" },
    { key: "orders", label: "Zamówienia" },
    { key: "clients", label: "Klienci" },
    { key: "settings", label: "Ustawienia" },
  ];
  const currentUser = {
    email: "example@gmail.com",
  };
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-64 bg-gray-100 px-2 py-4 flex justify-between flex-col">
      <div className="space-y-4">
        <div>
        <p className="text-xs text-gray-500">
          {now.toLocaleDateString()} {now.toLocaleTimeString()}
        </p>
          <p className="text-sm">Zalogowany:</p>
          <strong>{currentUser?.email}</strong>
        </div>
        <section className="flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`text-left p-2 rounded ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white font-bold"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </section>
      </div>
      <footer>
        <Button
          className="w-full"
          variant="outlined"
          onClick={() => console.log("WYLOGUJ SIĘ")}
          sx={{
            color: "red",
            borderColor: "red",
            "&:hover": {
              opacity: "90",
            },
          }}
          startIcon={<LogoutIcon sx={{ color: "red" }} />}
        >
          Wyloguj się
        </Button>
      </footer>
    </div>
  );
};

export default DashboardSideMenu;
