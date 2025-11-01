import React from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => setCurrentView("home")}>
          <h1>🏔️ Himalayan Tours & Travels</h1>
        </div>
        <div className="navbar-links">
          <button
            className={currentView === "home" ? "active" : ""}
            onClick={() => setCurrentView("home")}
          >
            Home
          </button>
          <button
            className={currentView === "tours" ? "active" : ""}
            onClick={() => setCurrentView("tours")}
          >
            Tours
          </button>
          {isAuthenticated && (
            <button
              className={currentView === "bookings" ? "active" : ""}
              onClick={() => setCurrentView("bookings")}
            >
              My Bookings
            </button>
          )}
          {isAdmin && (
            <button
              className={currentView === "admin" ? "active" : ""}
              onClick={() => setCurrentView("admin")}
            >
              Admin
            </button>
          )}
          {!isAuthenticated ? (
            <>
              <button
                className={currentView === "login" ? "active" : ""}
                onClick={() => setCurrentView("login")}
              >
                Login
              </button>
              <button
                className={`register-btn ${
                  currentView === "register" ? "active" : ""
                }`}
                onClick={() => setCurrentView("register")}
              >
                Register
              </button>
            </>
          ) : (
            <div className="user-info">
              <span>👤 {user?.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
