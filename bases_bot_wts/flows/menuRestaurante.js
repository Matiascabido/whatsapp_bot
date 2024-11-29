
const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const { reservasAnswer} = require('../utils/constants')

const flowReservasRest = addKeyword([EVENTS.ACTION]).addAnswer([reservasAnswer])

module.exports = flowReservasRest