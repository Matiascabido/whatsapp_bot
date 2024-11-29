
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { welcomeMedia } = require('../utils/constants')

const flowWelcome = 
    addKeyword(EVENTS.WELCOME).addAnswer("This is Welcome", 
        { delay: 5000, media: welcomeMedia },
        async (ctx, ctxFn) => ctxFn.flowDynamic('Hola esta es una respuesta del bot')
    )

module.exports = flowWelcome