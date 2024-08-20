import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import conectDB from "./config/mongoConnection.js";

import generateText from "./helper/blogGen.js";
import { Post } from "./models/posts.models.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

conectDB();

app.get("/api", (req, res) => {
  res.json("Blog Post App under construction");
});

app.post("/api/generate", async (req, res) => {
  // Accepts a prompt from the frontend and returns generated blog content
  const { prompt } = req.body;
  const GenText = await generateText(prompt);
  return res.json({ GenText });
});

app.get("/api/posts", async (req, res) => {
  // Retrieve all blogs from the database
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve posts", error: error.message });
  }
});

app.post("/api/posts", async (req, res) => {
  // Create a new blog in the database

  try {
    const content = req.body.content;
    const newPost = new Post({ content });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  // Delete a specific blog from the database
  try {
    const id = req.params.id;
    const deletePost = await Post.findByIdAndDelete(id);
    if (!deletePost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res
      .status(200)
      .json({ message: "Post deleted successfully", post: deletePost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
