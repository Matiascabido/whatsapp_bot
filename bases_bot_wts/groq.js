require('dotenv').config

const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env['GROQ_API_KEY']
});

async function chat(prompt, consult) {
  const chatCompletion = await groq.chat.completions.create({
    "messages": [
      {
        "role": "system",
        "content": prompt || "Soy un chef profesional\n"
      },
      {
        "role": "user",
        "content": consult || "El menu del dia\n"
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  let finalMessage = '';

  for await (const chunk of chatCompletion) {
    finalMessage += `${chunk?.choices[0]?.delta?.content} `
  }
  return finalMessage
}

module.exports = chat