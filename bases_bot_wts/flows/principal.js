
const {  addKeyword } = require('@bot-whatsapp/bot')
const { princialAnswer } = require('../utils/constants')

const flowPrincipal = addKeyword(['la']).addAnswer([princialAnswer])

module.exports = flowPrincipal