import { ChatPromptTemplate,MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import {
  ChatGoogleGenerativeAI,
 
} from "@langchain/google-genai";
import dotenv from "dotenv";
import { getChatHistory, saveChat } from "../redisMemory/redisMemory.js";

dotenv.config();
export const geminiWithRedis = async (req, res) => {
  try {
    const { userId, input } = req.body;
    let model = new ChatGoogleGenerativeAI({
      model: "",
      tempreture: 0.7,
      apiKey: process.env.GEMINI_API_KEY,
    });

    let prompt = new ChatPromptTemplate.fromMessages([
      ["system", "You are Gola, an intelligent helpful assistent"],
      new MessagesPlaceholder("chat_history"),
      ["human", "${input}"],
    ]);
    let chat_history = await getChatHistory(userId);
    const chain = RunnableSequence.from([
      async (input) => ({ input, chat_history }),
      prompt,
      model,
    ]);

    const result = await chain.invoke({ input });
    await saveChat(userId, input, result.content);
    res.status(200).json({ reply: result.content });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};
