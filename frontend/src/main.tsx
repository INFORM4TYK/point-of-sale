import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import BackDropLayout from "./components/layout/BackDropLayout.tsx";
import LoadingProvider from "./context/LoadingContext.tsx";
import ErrorProvider from "./context/ErrorContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./theme/main.scss";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ErrorProvider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <CartProvider>
                <BackDropLayout>
                  <App />
                </BackDropLayout>
              </CartProvider>
            </QueryClientProvider>
          </AuthProvider>
        </ErrorProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
