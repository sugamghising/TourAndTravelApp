import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Tours from "./components/Tours";
import Auth from "./components/Auth";
import Bookings from "./components/Bookings";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home setCurrentView={setCurrentView} />;
      case "tours":
        return <Tours />;
      case "login":
        return <Auth isLogin={true} setCurrentView={setCurrentView} />;
      case "register":
        return <Auth isLogin={false} setCurrentView={setCurrentView} />;
      case "bookings":
        return <Bookings />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <Home setCurrentView={setCurrentView} />;
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
        <main>{renderView()}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
