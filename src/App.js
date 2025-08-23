import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Product";
import Warehouses from "./pages/Warehouse";
import Inventory from "./pages/Inventory";
import TransferStock from "./pages/TransferStock";
import Login from "./pages/Login";
import { getToken } from "./services/Auth";
import Layout from "./pages/Layout";

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
        <Route path="/warehouses" element={<PrivateRoute><Warehouses /></PrivateRoute>} />
        <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
        <Route path="/transfer" element={<PrivateRoute><TransferStock /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}

