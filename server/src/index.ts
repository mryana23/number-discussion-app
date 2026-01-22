import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4000;

// Routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend is running!",
    environment: process.env.NODE_ENV,
    port: PORT
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Listen on 0.0.0.0 to accept external connections
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});