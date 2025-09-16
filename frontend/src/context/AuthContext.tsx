import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import api, { setAccessToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import useLoading from "../hooks/useLoading";
import useError from "../hooks/useError";

type User = { id: number; email: string };
type LoginFormInputs = { email: string; password: string };

export interface AuthContextInterface {
  currentUser: User | null;
  login: (data: LoginFormInputs) => Promise<void>;
  logout: () => void;
  loadingUser: boolean;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { startLoading } = useLoading();
  const { dispatchError } = useError();
  const navigate = useNavigate();

  const login = async (data: LoginFormInputs) => {
    const stopLoading = startLoading();
    try {
      const res = await api.post("/auth/login", data);

      const { user, accessToken } = res.data.data;

      setAccessToken(accessToken);
      setCurrentUser(user);

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      if (err.response) {
        dispatchError({ type: err.response.data.message });
      } else {
        dispatchError({ type: "server/error" });
      }
    } finally {
      stopLoading();
    }
  };

  const logout = useCallback(async () => {
    setCurrentUser(null);
    setAccessToken(null);

    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed, but clearing client-side session.", error);
    } finally {
      navigate("/auth");
    }
  }, [navigate]);

  useEffect(() => {
    const location = window.location.pathname;
    if (location === "/auth") {
      setLoadingUser(false);
      return;
    }

    const checkUserSession = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.token);

        const userRes = await api.get("/auth/me");
        setCurrentUser(userRes.data.data);
      } catch {
        navigate("/auth", { replace: true });
        setCurrentUser(null);
        setAccessToken(null);
      } finally {
        setLoadingUser(false);
      }
    };

    checkUserSession();
  }, []);
  return (
    <AuthContext.Provider value={{ loadingUser, currentUser, login, logout }}>
      {!loadingUser && children}
    </AuthContext.Provider>
  );
};
