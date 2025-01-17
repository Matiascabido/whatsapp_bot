require('dotenv').config()
const fs = require('fs')
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
    "max_tokens": 2048,
    "top_p": 1,
    "stream": true,
    "stop": null
  });

  let finalMessage = '';

  for await (const chunk of chatCompletion) {
    finalMessage += `${chunk?.choices[0]?.delta?.content ?? ''}`
  }
  return finalMessage
}

async function voiceToText(path) {
  if(!fs.existsSync(path)) {
    throw new Error('Faild!! File not found')
  }
  try {
    const voiceFile = await groq.audio.transcriptions.create({
      file: fs.createReadStream(path), // Required path to audio file - replace with your audio file!
      model: "whisper-large-v3-turbo", // Required model to use for transcription
      language: "es", // Optional
    })
    return voiceFile.text
  } catch (error) {
    console.error('VoiceToText faild: ', error)
    return 'ERROR'
  }
}

module.exports = {chat, voiceToText}
