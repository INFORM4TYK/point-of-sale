import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/auth/Authentication";
import Dashboard from "./pages/auth/Dashboard";
import ProductPage from "./pages/products/ProductPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/auth" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
