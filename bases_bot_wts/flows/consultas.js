
const chat = require('../groq')
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { consultaAnswer } = require('../utils/constants')

const flowConsultasRest = 
    addKeyword([EVENTS.ACTION]).
    addAnswer([consultaAnswer]).
    addAnswer("Hace tu consulta", {capture: true }, async (ctx, ctxFn) => {
        const prompt = 'Responde Hola'
        const consulta = ctx.body
        const answer = await chat(prompt, consulta)
        console.log('ansuer = ', answer)
        ctxFn.flowDynamic(answer.replaceAll("undefined", ''))
    })

module.exports = flowConsultasRest