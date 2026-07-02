import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export const getMessage = async (prompt) => {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const usage = response.usageMetadata;

    return {
        text: response.text(),
        usage: {
            promptTokenCount: usage?.promptTokenCount,
            candidatesTokenCount: usage?.candidatesTokenCount,
            totalTokenCount: usage?.totalTokenCount
        },
        model: "gemini-flash-latest"
    };
};