import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "express-async-errors";

import connectDB from "./config/mongoConnection.js";
import generateText from "./helper/blogGen.js";
import { Post } from "./models/posts.models.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Routes
app.get("/api", (req, res) => {
  res.json({ message: "Blog Post App under construction" });
});

app.post("/api/generate", async (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: "Invalid prompt provided." });
  }

  try {
    const GenText = await generateText(prompt);
    res.status(200).json({ GenText });
  } catch (error) {
    next(error);
  }
});

app.get("/api/posts", async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

app.post("/api/posts", async (req, res, next) => {
  const { content } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: "Invalid content provided." });
  }

  try {
    const newPost = new Post({ content });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/posts/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.status(200).json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    next(error);
  }
});

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error("An error occurred:", err.message);
  res.status(500).json({ error: "An internal server error occurred.", details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
