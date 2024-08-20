import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();


const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


async function generateText(prompt) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional blog post writer, help users write their blog posts",
        },
        { role: "user", content: prompt },
      ],
    });
    return response.choices[0].message.content;
  } catch (e) {
    console.error("Error generating text:", e);
  }
}

export default generateText;
