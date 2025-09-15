import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useAuth from "../../../hooks/useAuth";

const DashboardContent = () => {
  const router = useNavigate();
  const { loading } = useLoading();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!loading && !currentUser) {
      router("/auth", { replace: true });
    }
  }, [loading, currentUser]);
  
  if (loading && !currentUser) return;
  if (!loading && !currentUser) {
    return null;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <button></button>
      <p>
        Jesteś zalogowany jako: <strong>{currentUser?.email}</strong>
      </p>
    </div>
  );
};

export default DashboardContent;
