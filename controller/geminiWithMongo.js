import mongoose from "mongoose";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatMemory } from "../model/memoryModal.js";

dotenv.config();

let getChatData = async (userId) => {
  try {
    let data = await ChatMemory.findOne({ userId });
    if (!data) return [];
    return data.history.map((msg) => ({
      role: msg.role === "user" ? "human" : "ai",
      content: msg.text,
    }));
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

const saveUserText = async (userId, input, aiOutput) => {
  try {
    let update = {
      $push: {
        history: [
          { role: "user", text: input },
          { role: "model", text: aiOutput },
        ],
      },
    };
    await ChatMemory.findOneAndUpdate({ userId }, update, { upsert: true });
  } catch (e) {
    return {
      error: true,
      details: e,
    };
  }
};

export const geminiWithMongo = async (req, res) => {
  try {
    const { input, userId } = req.body;
    await mongoose.connect(process.env.MONGO_URI);

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      temperature: 0.7,
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system","You are GOla, a helpful assistant created by Manglesh Yadav. You have access to the full chat history and must remember everything the user said earlier in this conversation. Do not say you forgot anything. Always refer back to prior messages if needed"
       ],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    let chat_history = await getChatData(userId);

    const chain = RunnableSequence.from([
      async (input) => ({ input, chat_history }),
      prompt,
      model,
    ]);

    // console.log({
    //   input,
    //   chat_history,
    // });

    const output = await chain.invoke({ input });
    await saveUserText(userId, input, output.content);
    res.status(200).json({ msg: output.content });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};
