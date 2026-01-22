import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4000;

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "Backend is running!",
    environment: process.env.NODE_ENV || "development",
    port: PORT
  });
});

// Listen on 0.0.0.0 for Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});