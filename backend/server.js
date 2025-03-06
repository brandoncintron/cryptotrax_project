import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

const __dirname = path.resolve();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

connectDB();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const sampleNewsDataDb = mongoose.connection.useDb("sampleNewsData");

// Define a Mongoose schema for the news collection
const newsSchema = new mongoose.Schema(
  {},
  {
    collection: "news", // use the news collection
    strict: false       // allow all fields
  }
);

// Create a Mongoose model using that schema
const News = sampleNewsDataDb.model("News", newsSchema);

// Best daily performers
app.get("/api", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/v1/cryptocurrency/listings/latest?limit=20&sort=percent_change_24h`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/api/rankings", async (req, res) => {
  // 200 or less = 1 api call
  const limit = 200;
  
  try {
    const response = await fetch(
      `${BASE_URL}/v1/cryptocurrency/listings/latest?limit=${limit}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/api/currency/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `${BASE_URL}/v2/cryptocurrency/quotes/latest?id=${id}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/api/metadata/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(
      `${BASE_URL}/v2/cryptocurrency/info?id=${id}`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": API_KEY,
        },
      }
    );
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Fetch the news collection from the sampleNewsData database in mongoDB
app.get("/api/news", async (req, res) => {
  try {
    const allNews = await News.find({});
    res.json(allNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}


// Use npm run dev while in backend to run
app.listen(PORT, () => {
  console.log("Express server started at http://localhost:" + PORT);
});

// r70kb5vahKYLuRti