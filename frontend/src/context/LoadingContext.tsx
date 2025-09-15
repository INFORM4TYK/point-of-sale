import { createContext, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ReactNode } from "react";
export interface LoadingContextType {
  startLoading: () => () => void;
  loading: boolean;
  startLoadingSilent: () => () => void;
  loadingSilent: boolean;
}

export const LoadingContext = createContext<LoadingContextType | null>(null);

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<string[]>([]);
  const [loadingSilent, setLoadingSilent] = useState<string[]>([]);

  const startLoading = () => {
    const id = uuidv4();
    setLoading((prevLoading) => [...prevLoading, id]);

    return () => {
      setLoading((prevLoading) => prevLoading.filter((l) => l !== id));
    };
  };
  const startLoadingSilent = () => {
    const id = uuidv4();
    setLoadingSilent((prevLoading) => [...prevLoading, id]);

    return () => {
      setLoadingSilent((prevLoading) => prevLoading.filter((l) => l !== id));
    };
  };
  const value = useMemo(
    () => ({
      startLoading,
      loading: loading.length > 0,
      startLoadingSilent,
      loadingSilent: loading.length > 0,
    }),
    [loading, loadingSilent]
  );
  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export default LoadingProvider;
