import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import BackDropLayout from "./components/layout/BackDropLayout.tsx";
import LoadingProvider from "./context/LoadingContext.tsx";
import ErrorProvider from "./context/ErrorContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <ErrorProvider>
        <BackDropLayout>
          <App />
        </BackDropLayout>
      </ErrorProvider>
    </LoadingProvider>
  </StrictMode>
);
