import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";

type User = {
  id: number;
  email: string;
};

const DashboardContent = () => {
  const router = useNavigate();
  const { startLoading, loading } = useLoading();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const stopLoading = startLoading();
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5001/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading();
      }
    };

    fetchUser();
  }, []);
  if (loading && !user) return <div>Ładowanie</div>;
  if (!loading && !user) {
    router("/auth", { replace: true });
    return null;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p>
        Jesteś zalogowany jako: <strong>{user?.email}</strong>
      </p>
    </div>
  );
};

export default DashboardContent;
