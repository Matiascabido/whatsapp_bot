const MockAdapter = require('@bot-whatsapp/database/mock')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const { createBot, createProvider, createFlow } = require('@bot-whatsapp/bot')
const flowPrincipal = require('./flows/principal')
const flowWelcome = require('./flows/welcome')
const flowMenu = require('./flows/menuApp')
const flowMenuRest = require('./flows/menuRestaurante')
const flowReservasRest = require('./flows/reservas')
const flowConsultasRest = require('./flows/consultas')
const chat = require('./groq')


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([
		flowPrincipal, 
		flowMenu, 
		flowMenuRest, 
		flowReservasRest, 
		flowConsultasRest,
		flowWelcome
	])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    
    const answer = await chat('Eres un asistente',  'me hace un road map para mejorar con nodejs')
    console.log('////////// AI is thinkg... ///////')
    console.log(answer)
    console.log('////////// FINISH ///////')
    QRPortalWeb()

}

main()
