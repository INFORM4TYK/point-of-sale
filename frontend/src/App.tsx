import { Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./pages/auth/Authentication";
import Dashboard from "./pages/auth/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dev" replace />} />
        <Route path="/dev" element={<Dashboard />} />

        {/* <Route path="/auth" element={<Authentication />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
