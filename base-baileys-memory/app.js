const { createBot, createProvider, createFlow, addKeyword, EVENTS } = 
    require('@bot-whatsapp/bot')
const path = require('path')
const fs = require('fs')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const menuPath = path.join(__dirname, 'mensajes', 'menu.txt')
const menu = fs.readFileSync(menuPath,'utf8')

const flowPrincipal = 
    addKeyword(['la']).addAnswer(['Welcome Home'])

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
				if (!['1','2','3','4','5','0'].includes(ctx.body)) {
					return fallBack('Opcion invalida, elije entre 1,2,3,4,5')
				}else {
						switch (ctx.body) {
								case '1':
										return await flowDynamic('Esta es la opcion 1');
								case '2':
										return await flowDynamic('Esta es la opcion 2');
								case '3':
										return await flowDynamic('Esta es la opcion 3');
								case '4':
										return await flowDynamic('Esta es la opcion 4');
								case '4':
										return await flowDynamic('Esta es la opcion 5');    
								
								case '0':
										return await flowDynamic("Saliendo... puedes voler al menu escribiendo '*menu*'");    
						}
				}
    })

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowWelcome, flowMenu])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    
    QRPortalWeb()
}

main()
