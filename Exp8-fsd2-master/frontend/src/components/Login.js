import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("username", res.data.user.username);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Login failed");
      } else {
        setError("Server not reachable. Is the backend running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fade-in"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: "440px",
          padding: "48px 40px",
        }}
      >
        {/* Brand Icon */}
        <div className="brand-icon">
          <LockOutlinedIcon style={{ color: "white", fontSize: 30 }} />
        </div>

        {/* Header */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "8px",
            background: "linear-gradient(135deg, #ffffff, #c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome Back
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.5)",
            fontSize: "14px",
            marginBottom: "36px",
          }}
        >
          Sign in to access your dashboard
        </p>

        {/* Error Message */}
        {error && (
          <div
            className="fade-in"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "20px",
              color: "#f87171",
              fontSize: "14px",
            }}
          >
            <ErrorOutlineIcon style={{ fontSize: 18 }} />
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={login}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "8px",
                letterSpacing: "0.3px",
              }}
            >
              USERNAME
            </label>
            <input
              id="login-username"
              className="custom-input form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>

          <div style={{ marginBottom: "28px", position: "relative" }}>
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "8px",
                letterSpacing: "0.3px",
              }}
            >
              PASSWORD
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="login-password"
                className="custom-input form-control"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{ paddingRight: "48px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                }}
              >
                {showPassword ? (
                  <VisibilityOffIcon style={{ fontSize: 20 }} />
                ) : (
                  <VisibilityIcon style={{ fontSize: 20 }} />
                )}
              </button>
            </div>
          </div>

          <button
            id="login-button"
            type="submit"
            className="btn-gradient-primary"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {loading ? (
              <>
                <div
                  className="loading-spinner"
                  style={{
                    width: "20px",
                    height: "20px",
                    margin: 0,
                    borderWidth: "2px",
                  }}
                />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div
          style={{
            marginTop: "28px",
            padding: "16px",
            background: "rgba(124, 58, 237, 0.08)",
            borderRadius: "12px",
            border: "1px solid rgba(124, 58, 237, 0.15)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "rgba(255,255,255,0.5)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              marginBottom: "10px",
            }}
          >
            DEMO CREDENTIALS
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              fontSize: "13px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Admin</span>
              <br />
              <code style={{ color: "#c4b5fd" }}>admin / admin123</code>
            </div>
            <div
              style={{
                width: "1px",
                background: "rgba(255,255,255,0.1)",
              }}
            />
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>User</span>
              <br />
              <code style={{ color: "#c4b5fd" }}>user / user123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
