import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/auth/Authentication";
import Dashboard from "./pages/auth/Dashboard";
import ProductPage from "./pages/products/ProductPage";
import OrderPage from "./pages/orders/OrderPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/auth" element={<Authentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/order/:id?" element={<OrderPage />} />

      </Routes>
    </>
  );
}

export default App;
