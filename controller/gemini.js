import { GoogleGenerativeAI } from "@google/generative-ai";
export const gemini = async (req, res) => {
  try {
    let genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "Explain quantum computing in simple terms.";

    let result = await model.generateContent(prompt);
    let response = await result.response;
    res.status(200).json({ msg: response.text() });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};
