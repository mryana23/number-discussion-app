import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});