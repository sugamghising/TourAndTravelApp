import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

interface AuthProps {
  isLogin: boolean;
  setCurrentView: (view: string) => void;
}

const Auth: React.FC<AuthProps> = ({ isLogin, setCurrentView }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      setCurrentView("tours");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-subtitle">
          {isLogin
            ? "Login to book your next adventure"
            : "Register to start your journey"}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Enter your password (min 6 characters)"
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setCurrentView("register")}>
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setCurrentView("login")}>
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
