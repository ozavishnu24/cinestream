// server/routes/chatRoutes.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// DEBUG: Let's see if the key is actually loaded
console.log("LOADED API KEY LENGTH:", process.env.GEMINI_API_KEY?.length);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    // Use the standard model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("AI Reply:", text);
    res.json({ reply: text });
    
  } catch (error) {
    // This will print the REAL error
    console.error("------ FULL ERROR -----");
    console.error(error); 
    console.error("-----------------------");
    res.status(500).json({ message: "Error generating response" });
  }
});

export default router;