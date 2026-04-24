const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const SECRET_KEY = "my_super_secret_key_2026";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Hardcoded users for demonstration
const users = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user", password: "user123" },
];

// ==================== ROUTES ====================

// Health Check
app.get("/", (req, res) => {
  res.json({
    message: "JWT Authentication API is running",
    endpoints: {
      login: "POST /login",
      protected: "GET /protected",
    },
  });
});

// POST /login - Authenticate user and return JWT
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Find user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  console.log(`✅ User '${username}' logged in successfully`);

  res.json({
    message: "Login successful",
    token: token,
    user: { id: user.id, username: user.username },
  });
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
}

// GET /protected - Protected route (requires valid JWT)
app.get("/protected", authenticateToken, (req, res) => {
  console.log(`🔒 Protected route accessed by '${req.user.username}'`);
  res.json({
    message: `Welcome, ${req.user.username}! You have access to the protected route.`,
    user: req.user,
    timestamp: new Date().toISOString(),
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`\n🚀 JWT Backend Server running on http://localhost:${PORT}`);
  console.log(`\n📋 Available Credentials:`);
  console.log(`   Username: admin  |  Password: admin123`);
  console.log(`   Username: user   |  Password: user123`);
  console.log(`\n📡 API Endpoints:`);
  console.log(`   POST /login      - Authenticate & get token`);
  console.log(`   GET  /protected  - Access protected resource`);
  console.log(`\n`);
});
