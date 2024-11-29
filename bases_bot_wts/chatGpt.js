const OpenAI = require("openai");
const { apiKeyOpenAI } = require('./utils/constants')

const chat = async (prompt, text) => {
    try {
        console.log('Credential ==> ', { apiKey: apiKeyOpenAI })
        const openai = new OpenAI({
            maxRetries: 0,
            timeout: 20 * 1000,
            apiKey: apiKeyOpenAI
        });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: prompt || "You are a helpful assistant." },
                { role: "user", content: text  || "Write a haiku about recursion in programming."},
            ],
            maxRetries: 5,
            timeout: 5 * 1000,
        });
        return completion.data.choices[0].message;
    } catch (err) {
        console.error("Error al conectar con OpenAI:", err);
        return "ERROR";
    }
};

module.exports = chat;