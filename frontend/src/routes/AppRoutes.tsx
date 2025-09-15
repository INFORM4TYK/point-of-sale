import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Authentication from "../pages/auth/Authentication";
import Dashboard from "../pages/auth/Dashboard";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);
