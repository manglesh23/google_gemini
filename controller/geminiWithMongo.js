import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const geminiWithMongo = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    res.status(200).json({ msg: "Gemini with mongo" });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};
