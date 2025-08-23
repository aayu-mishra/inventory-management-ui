import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-brand">Cisele</div>
        <nav className="nav-links">
          <Link to="/products" className="nav-link">
            Products
          </Link>
          <Link to="/inventory" className="nav-link">
            Inventory
          </Link>
          <Link to="/warehouse" className="nav-link">
            Warehouse
          </Link>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
