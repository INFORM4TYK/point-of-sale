import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import BackDropLayout from "./components/layout/BackDropLayout.tsx";
import LoadingProvider from "./context/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <BackDropLayout>
        <App />
      </BackDropLayout>
    </LoadingProvider>
  </StrictMode>
);
