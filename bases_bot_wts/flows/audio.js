const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { handlerAI } = require('../utils/wisper');
const { chat } = require('../utils/groq')

const flowAudio = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer(null, null,  async (ctx, ctxFn) => {
        const text = await handlerAI(ctx)
        ctxFn.flowDynamic(`Resultado: ${text}`)
})

const flowAudioAIConsult = addKeyword(EVENTS.VOICE_NOTE)
    .addAnswer('si, diga', null,  async (ctx, ctxFn) => {
        const text = await handlerAI(ctx)
        const prompt = 'Tu eres un gran asistente, con mucho conocimento general'
        const answer = await chat(prompt, text)
        ctxFn.flowDynamic(answer.replaceAll("undefined", ''))
})

module.exports = {
    flowAudioAIConsult,
    flowAudio
}