// import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// const apiKey = "AIzaSyDBLEeVDOpZ2_CwGgOG7ByskhHsoH8sGbg";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash-latest",
// });

// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// const safetySettings = [
//     {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     },
// ];

// async function run(prompt) {
//     const chatSession = model.startChat({
//         generationConfig,
//         safetySettings,
//         history: [
//         ],
//     });

//     const result = await chatSession.sendMessage(prompt);
//     return result.response.text();
// }

// export default run;

const API_KEY = "AIzaSyDBLEeVDOpZ2_CwGgOG7ByskhHsoH8sGbg";
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;


async function run(prompt) {
    try {
        const chatSession = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: prompt }]
                }]
            })
        });
        const result = await chatSession.json();

        return result?.candidates[0]?.content?.parts[0]?.text;
    } catch (error) {
        const result = "Something went wrong, Try again later.";
        return result;
    }

}

export default run;