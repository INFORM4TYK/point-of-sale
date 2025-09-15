import { createContext, useEffect, useState, type ReactNode } from "react";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";
import api from "../config/api";
import { useNavigate } from "react-router-dom";

type User = { id: number; email: string };
type LoginFormInputs = { email: string; password: string };

export interface AuthContextInterface {
  currentUser: User | null;
  login: (data: LoginFormInputs) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { startLoading } = useLoading();
  const { dispatchError } = useError();
  const navigate = useNavigate();
  const login = async (data: LoginFormInputs) => {
    const stopLoading = startLoading();
    try {
      const res = await api.post("/auth/login", data);
      localStorage.setItem("token", res.data.data.token);
      setCurrentUser(res.data.data.user);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.log(err.response)
      if (err.response) {
        dispatchError({ type: err.response.data.message });
      } else {
        dispatchError({ type: "server/error" });
      }
    } finally {
      stopLoading();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };
  useEffect(() => {
    const fetchUser = async () => {
      const stopLoading = startLoading();
      const token = localStorage.getItem("token");
      if (!token) {
        stopLoading();
        return;
      }

      try {
        const res = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(res.data.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setCurrentUser(null);
      } finally {
        stopLoading();
      }
    };

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
