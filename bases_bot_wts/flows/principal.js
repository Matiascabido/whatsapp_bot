
const {  addKeyword } = require('@bot-whatsapp/bot')
const { princialAnswer } = require('../utils/constants')

const flowPrincipal = addKeyword(['la']).addAnswer([princialAnswer])
    .addAction("Hace tu consulta", {capture: true }, async (ctx, ctxFn) => {
        const prompt = 'Responde Hola'
        const consulta = ctx.body
        let answer = await chat(prompt, consulta)
        answer = answer.replaceAll("undefined", '').trim()
        console.log('ansuer = ', answer)
        ctxFn.flowDynamic(answer)
})

module.exports = flowPrincipal