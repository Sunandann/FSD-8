import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import StorageIcon from "@mui/icons-material/Storage";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokenInfo, setTokenInfo] = useState(null);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    // Decode token payload for display
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setTokenInfo(payload);
    } catch (e) {
      // Token couldn't be decoded
    }
  }, [token, navigate]);

  const fetchProtectedData = async () => {
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await axios.get("http://localhost:5000/protected", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Access denied");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    navigate("/");
  };

  if (!token) return null;

  return (
    <div className="fade-in">
      {/* Navbar */}
      <nav className="app-navbar">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <DashboardIcon
              style={{ color: "#7c3aed", fontSize: 24 }}
            />
            <span className="navbar-brand-text">JWT Dashboard</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span className="status-badge success">
              <CheckCircleIcon style={{ fontSize: 14 }} />
              Authenticated
            </span>
            <button
              id="logout-button"
              className="btn-gradient-danger"
              onClick={logout}
              style={{
                padding: "8px 20px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <LogoutIcon style={{ fontSize: 18 }} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container" style={{ padding: "40px 15px" }}>
        {/* Welcome Header */}
        <div style={{ marginBottom: "36px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              marginBottom: "8px",
              background: "linear-gradient(135deg, #ffffff, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome, {username || "User"} 👋
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px" }}>
            You are authenticated. Explore protected routes below.
          </p>
        </div>

        {/* Info Cards Row */}
        <div className="row g-4" style={{ marginBottom: "32px" }}>
          {/* Session Info Card */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-card" style={{ padding: "24px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PersonIcon style={{ color: "white", fontSize: 20 }} />
                </div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "0.5px",
                  }}
                >
                  SESSION INFO
                </span>
              </div>
              <div style={{ fontSize: "14px", lineHeight: "2" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>User:</span>{" "}
                  <span style={{ color: "#c4b5fd", fontWeight: 500 }}>
                    {username || "N/A"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Status:</span>{" "}
                  <span className="status-badge success" style={{ padding: "2px 10px" }}>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Token Info Card */}
          <div className="col-md-6 col-lg-4">
            <div className="glass-card" style={{ padding: "24px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <VpnKeyIcon style={{ color: "white", fontSize: 20 }} />
                </div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "0.5px",
                  }}
                >
                  TOKEN DETAILS
                </span>
              </div>
              <div style={{ fontSize: "14px", lineHeight: "2" }}>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Issued:</span>{" "}
                  <span style={{ color: "#6ee7b7", fontWeight: 500 }}>
                    {tokenInfo
                      ? new Date(tokenInfo.iat * 1000).toLocaleTimeString()
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>Expires:</span>{" "}
                  <span style={{ color: "#fbbf24", fontWeight: 500 }}>
                    {tokenInfo
                      ? new Date(tokenInfo.exp * 1000).toLocaleTimeString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* JWT Token Card */}
          <div className="col-md-12 col-lg-4">
            <div className="glass-card" style={{ padding: "24px", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #dc2626, #ef4444)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SecurityIcon style={{ color: "white", fontSize: 20 }} />
                </div>
                <span
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 600,
                    fontSize: "13px",
                    letterSpacing: "0.5px",
                  }}
                >
                  JWT TOKEN
                </span>
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "11px",
                  color: "#c4b5fd",
                  wordBreak: "break-all",
                  fontFamily: "'Courier New', monospace",
                  maxHeight: "60px",
                  overflow: "hidden",
                }}
              >
                {token ? token.substring(0, 80) + "..." : "No token"}
              </div>
            </div>
          </div>
        </div>

        {/* Protected Route Test */}
        <div className="glass-card" style={{ padding: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StorageIcon style={{ color: "white", fontSize: 22 }} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "white",
                  margin: 0,
                }}
              >
                Protected Route Test
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                GET /protected — Requires valid JWT token
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              id="fetch-data-button"
              className="btn-gradient-success"
              onClick={fetchProtectedData}
              disabled={loading}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {loading ? (
                <>
                  <div
                    className="loading-spinner"
                    style={{
                      width: "18px",
                      height: "18px",
                      margin: 0,
                      borderWidth: "2px",
                      borderTopColor: "white",
                    }}
                  />
                  Fetching...
                </>
              ) : (
                <>
                  <SecurityIcon style={{ fontSize: 18 }} />
                  Fetch Protected Data
                </>
              )}
            </button>
          </div>

          {/* Success Response */}
          {data && (
            <div className="response-card fade-in">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <CheckCircleIcon
                  style={{ color: "#34d399", fontSize: 20 }}
                />
                <span
                  style={{
                    color: "#34d399",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  200 OK — Access Granted
                </span>
                <AccessTimeIcon
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: 16,
                    marginLeft: "auto",
                  }}
                />
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "12px",
                  }}
                >
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}

          {/* Error Response */}
          {error && (
            <div
              className="fade-in"
              style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "16px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <ErrorOutlineIcon
                  style={{ color: "#f87171", fontSize: 20 }}
                />
                <span
                  style={{
                    color: "#f87171",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Error — {error}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
