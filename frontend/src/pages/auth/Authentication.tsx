import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Auth/Login/Login";

const Authentication = () => {
  const router = useNavigate();

  const isAuthenticated = false;
  useEffect(() => {
    if (isAuthenticated) {
      router("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);
  return (
    <>
      <Login />
    </>
  );
};

export default Authentication;
