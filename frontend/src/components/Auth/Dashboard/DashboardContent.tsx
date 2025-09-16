import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";
import useAuth from "../../../hooks/useAuth";
import ProductList from "../../Products/ProductList";

const DashboardContent = () => {
  const router = useNavigate();
  const { loading } = useLoading();
  const { currentUser, loadingUser, logout } = useAuth();

  useEffect(() => {
    if (!loadingUser && !loading && !currentUser) {
      router("/auth", { replace: true });
    }
  }, [loadingUser, loading, currentUser]);

  if (loading && !currentUser) return;
  if (!loading && !currentUser) {
    return null;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <button onClick={() => logout()}>Wyloguj się</button>
      <p>
        Jesteś zalogowany jako: <strong>{currentUser?.email}</strong>
      </p>
      <div>To sa products</div>
      {/* <ProductList /> */}
    </div>
  );
};

export default DashboardContent;
