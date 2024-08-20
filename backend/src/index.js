import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import generateText from './helper/blogGen.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/api', (req, res) => {
    res.json('Blog Post App under construction');
});

app.post('/api/generate', async (req, res) => {
    // Accepts a prompt from the frontend and returns generated blog content
    const { prompt } = req.body;
    const GenText = await generateText(prompt);
    return res.json({ GenText });
});

app.get("/api/posts", async (req, res) => {
  // Retrieve all blogs from the database

});

app.delete("/api/posts/:id", async (req, res) => {
  // Delete a specific blog from the database

}); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});