import { useContext } from "react";

import { LoadingContext } from "../context/LoadingContext";
import type { LoadingContextType } from "../context/LoadingContext";

const useLoading = () => useContext(LoadingContext) as LoadingContextType;

export default useLoading;
