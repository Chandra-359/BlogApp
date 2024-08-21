import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in the environment variables.");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // You can set other configurations here if needed
});

async function generateText(prompt) {
  try {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error("Invalid prompt provided. Prompt must be a non-empty string.");
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional blog post writer. Help users write their blog posts.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000, // Adjust based on your requirements and OpenAI's token limits
      temperature: 0.7, // Adjust for creativity
    });

    if (response && response.choices && response.choices.length > 0) {
      return response.choices[0].message.content.trim();
    } else {
      throw new Error("No response received from OpenAI.");
    }
  } catch (error) {
    console.error("Error generating text:", error.message);
    throw new Error(`Failed to generate text: ${error.message}`);
  }
}

export default generateText;
