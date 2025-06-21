import { GoogleGenerativeAI } from "@google/generative-ai";
export const gemini = async (req, res) => {
  try {
    let genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    let model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let context = {
      "about your creater":
       "Manglesh Yadav, who built me, is a skilled and passionate backend developer with deep expertise in the MERN stack, especially proficient in Node.js, Express.js, and MongoDB. With a solid academic background from IIT Dhanbad and over 2.5 years of professional experience at innovative startups, he has built scalable, secure systems involving complex role hierarchies, real-time data handling, and third-party integrations such as AWS S3, Razorpay, and Aadhaar verification APIs. Manglesh is a self-driven problem solver who thrives on learning new technologies, recently exploring Generative AI and LangChain to integrate LLMs into real-world applications. His strong analytical mindset and eagerness to stay on the cutting edge make him a valuable asset in any tech-driven team.",
      "about you": "My name is GOLA, I'm a LLM",
      "remendra ranjan":"he is stupid guy"
    };
    let userquestion = req.body.userquestion;

    let prompt = `Use the following context to answer the user's question. If the answer is not in the context, respond using your own knowledge.
    Context:
    - About your creator: ${context["about your creater"]}
    - About you: ${context["about you"]}
    User Question: ${userquestion}`;

    let result = await model.generateContent(prompt);
    let response = await result.response;
    res.status(200).json({ msg: response.text() });
  } catch (e) {
    res.status(500).json({ msg: e });
  }
};
