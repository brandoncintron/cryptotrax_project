import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the Mongo db
connectDB();

// Env variables and headers
const { BASE_URL, API_KEY } = process.env;
const API_HEADERS = { "X-CMC_PRO_API_KEY": API_KEY };

// Helper function to fetch data from the cryptocurrency API
async function fetchCryptoData(url) {
  const response = await fetch(url, { headers: API_HEADERS });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data.data;
}

// Set up MongoDB news model
const sampleNewsDataDb = mongoose.connection.useDb("sampleNewsData");
const newsSchema = new mongoose.Schema({}, { collection: "news", strict: false });
const News = sampleNewsDataDb.model("News", newsSchema);

// Routes

// Best daily performers
app.get("/api", async (req, res) => {
  const endpoint = `${BASE_URL}/v1/cryptocurrency/listings/latest?limit=20&sort=percent_change_24h`;
  try {
    const data = await fetchCryptoData(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rankings
app.get("/api/rankings", async (req, res) => {
  const limit = 200;
  const endpoint = `${BASE_URL}/v1/cryptocurrency/listings/latest?limit=${limit}`;
  try {
    const data = await fetchCryptoData(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Currency details by ID
app.get("/api/currency/:id", async (req, res) => {
  const { id } = req.params;
  const endpoint = `${BASE_URL}/v2/cryptocurrency/quotes/latest?id=${id}`;
  try {
    const data = await fetchCryptoData(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Metadata by ID
app.get("/api/metadata/:id", async (req, res) => {
  const { id } = req.params;
  const endpoint = `${BASE_URL}/v2/cryptocurrency/info?id=${id}`;
  try {
    const data = await fetchCryptoData(endpoint);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// News from MongoDB
app.get("/api/news", async (req, res) => {
  try {
    const allNews = await News.find({});
    res.json(allNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files in prod
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

// Start the server
app.listen(PORT, () => {
  console.log(`Express server started at http://localhost:${PORT}`);
});
