import mongoose from "mongoose";

const chatMemorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  history: {
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },
  },
  text: {
    type: String,
    required: true,
  },
});

export default ChatMemory = mongoose.model("ChatMemory", chatMemorySchema);
