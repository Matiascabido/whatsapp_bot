const { menu } = require('../utils/constants')
const { addKeyword } = require('@bot-whatsapp/bot')
const flowMenuRest = require('./menuRestaurante')
const flowReservasRest = require('./reservas')
const flowConsultasRest = require('./consultas')


const flowMenu = addKeyword(['menu', 'Menu', 'Menú'])
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

module.exports = flowMenu