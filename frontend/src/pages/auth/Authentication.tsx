import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../components/Auth/Login/Login";
import Register from "../../components/Auth/Register/Register";

const Authentication = () => {
  const router = useNavigate();
  const location: any = useLocation();

  const params = new URLSearchParams(location.search);
  const typeParam = params.get("type");

  const isValidType = typeParam === "login" || typeParam === "register";
  const type: "login" | "register" = isValidType
    ? (typeParam as "login" | "register")
    : "login";
  const [screen, setScreen] = useState<"register" | "login">(
    type || "register"
  );
  const isAuthenticated = false;
  useEffect(() => {
    if (isAuthenticated) {
      router("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);
  return (
    <>
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "register" && <Register setScreen={setScreen} />}
    </>
  );
};

export default Authentication;
