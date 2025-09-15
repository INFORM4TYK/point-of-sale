import { useContext } from "react";
import { AuthContext, type AuthContextInterface } from "../context/AuthContext";

const useAuth = () => useContext(AuthContext) as AuthContextInterface;

export default useAuth;
