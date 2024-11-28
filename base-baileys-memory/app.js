require('dotenv').config
const path = require('path')
const fs = require('fs')
const chat = require('./chatGpt')
const MockAdapter = require('@bot-whatsapp/database/mock')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = 
    require('@bot-whatsapp/bot')



const menuPath = path.join(__dirname, 'mensajes', 'menu.txt')
const menu = fs.readFileSync(menuPath,'utf8')

const flowPrincipal = addKeyword(['la']).addAnswer(['Welcome Home'])
const flowMenuRest = addKeyword([EVENTS.ACTION]).addAnswer(['This is the Restaurant Menu'], 
	{ media: `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wordmstemplates.com%2Fwp-content%2Fuploads%2F2015%2F07%2Fmenu-template-5254.jpg
		&f=1&nofb=1&ipt=f2e2ba80af83e48e1e199befd22d82e09982e98f129f025107dd57b8735aebb5&ipo=images`})
const flowReservasRest = addKeyword([EVENTS.ACTION]).addAnswer(['When do you need the reservation ?'])
const flowConsultasRest = addKeyword([EVENTS.ACTION]).addAnswer(['What can I help you ?']).
addAnswer("Hace tu consulta", {capture: true }, async (ctx, ctxFn) => {
	const prompt = 'Responde Hola'
	const consulta = ctx.body
	const answer = await chat(prompt, consulta)
	console.log(answer.content);

})

const flowWelcome = 
    addKeyword(EVENTS.WELCOME).addAnswer("This is Welcome", 
        { delay: 5000, media: 'https://i.pinimg.com/originals/a3/43/2c/a3432c23b02559820dba08772e8fc26c.jpg'},
        async (ctx, ctxFn) => {
            console.log('Body', ctx.body)
            await ctxFn.flowDynamic('Hola esta es una respuesta del bot')
        }
    )

const flowMenu = addKeyword(['menu'])
	.addAnswer([menu], { capture: true }, 
			async (ctx, {gotoFlow, fallBack, flowDynamic}) => {
				if (!['1','2','3','0'].includes(ctx.body)) {
					return fallBack('Opcion invalida, elije entre 1,2,3')
				}else {
					switch (ctx.body) {
						case '1':
								return gotoFlow(flowMenuRest);
						case '2':
								return gotoFlow(flowReservasRest);
						case '3':
								return gotoFlow(flowConsultasRest);
						
						case '0':
								return await flowDynamic("Saliendo... puedes voler al menu escribiendo '*menu*'");    
					}
				}
    })

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowWelcome, flowMenu, flowMenuRest, flowReservasRest, flowConsultasRest])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    
    QRPortalWeb()
}

main()
