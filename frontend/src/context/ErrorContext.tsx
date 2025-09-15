import { createContext, useMemo, useReducer } from "react";
import type { ReactNode } from "react";
import type { ErrorAction } from "../reducers/errorReducer";
import errorReducer from "../reducers/errorReducer";

export interface ErrorContextInterface {
  error: string;
  dispatchError: React.Dispatch<ErrorAction>;
}

export const ErrorContext = createContext<ErrorContextInterface | null>(null);

const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [error, dispatchError] = useReducer(errorReducer, { error: "" });

  const value = useMemo<ErrorContextInterface>(
    () => ({
      error: error.error,
      dispatchError,
    }),
    [error.error]
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorProvider;
