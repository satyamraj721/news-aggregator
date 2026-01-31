const express = require("express");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/newsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Detailed CORS configuration
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// ✅ API ROUTES
app.use("/api/news", newsRoutes);

// Health check endpoint (accessible at http://localhost:5000/health)
app.get("/health", (req, res) => {
  console.log("✅ Health check requested");
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  console.log(`❌ 404 - Route not found: ${req.path}`);
  res.status(404).json({ error: "Route not found" });
});

// Start server on localhost (127.0.0.1)
app.listen(PORT, "localhost", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api/news`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);
});
