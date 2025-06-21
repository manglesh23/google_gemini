import { GoogleGenerativeAI } from "@google/generative-ai";
export const geminiMemoryEnabled = async (req, res) => {
  try {
    let genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chatHistory = [];

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const userInput = req.body.userquestion;
    const result = await chat.sendMessage(userInput);
    const response = result.response.text();

    // console.log(response);

    // Push to memory for future turns
    
    chatHistory.push({ role: "user", parts: [{ text: userInput }] });
    chatHistory.push({ role: "model", parts: [{ text: response }] });
    res.status(200).json({ msg: response,chatHistory:chatHistory });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};
