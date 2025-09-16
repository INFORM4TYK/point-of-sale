import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Divider, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
type SideMenuProps = {
  activeTab: string;
  setActiveTab: (tab: any) => void;
};
import MenuIcon from "@mui/icons-material/Menu";
import useAuth from "../../../../hooks/useAuth";
const DashboardSideMenu = ({ activeTab, setActiveTab }: SideMenuProps) => {
  const tabs = [
    { key: "dashboard", label: "Panel Główny" },
    { key: "products", label: "Produkty" },
    { key: "orders", label: "Zamówienia" },
    { key: "clients", label: "Klienci" },
  ];
  const { currentUser, logout } = useAuth();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <section>
      <div className="sm:hidden absolute top-5 right-5 z-20 bg-primary rounded-lg flex items-center px-2 py-1 gap-1">
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{ padding: 0 }}
        >
          <MenuIcon sx={{ color: "white", fontSize: "1.5rem !important" }} />
        </IconButton>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64  bg-gray-100 px-2 py-4 flex flex-col justify-between transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:block`}
      >
        <div className=" h-full flex justify-between flex-col">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">Zalogowany:</p>
                <strong>{currentUser?.email}</strong>
              </div>
              <div className="sm:hidden">
                <CloseIcon
                  onClick={() => setOpen(false)}
                  sx={{ fontSize: "2rem !important" }}
                />
              </div>
            </div>
            <Divider />
            <section className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`text-left p-2 rounded ${
                    activeTab === tab.key
                      ? "bg-blue-500 text-white font-bold"
                      : "hover:bg-gray-200"
                  }`}
                  onClick={() => {
                    setActiveTab(tab.key), setOpen(false);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </section>
          </div>

          <footer className="text-center space-y-2">
            <Button
              className="w-full"
              variant="outlined"
              onClick={() => logout()}
              sx={{
                color: "red",
                borderColor: "red",
                "&:hover": { opacity: "90" },
              }}
              startIcon={<LogoutIcon sx={{ color: "red" }} />}
            >
              Wyloguj się
            </Button>
            <p className="text-xs text-gray-500">
              {now.toLocaleDateString()} {now.toLocaleTimeString()}
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
};

export default DashboardSideMenu;
