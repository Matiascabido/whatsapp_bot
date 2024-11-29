const path = require('path')
const fs = require('fs')

const apiKeyOpenAI = 'sk-svcacct-Ja9OhP5EzVj8Gvpj7XsPs2t-UXUx-myywpnUygwyEtzVMmFcvl5fgyQk3sPfxS33e_ZRgT3BlbkFJu18Q-1lkF-m5rPEoNG-nAdpYdR3jzlhcKpCyh1_g3HKd43njGzstRwhItQSh4uzoNSjgwA'
const menuPath = path.join(__dirname, '../mensajes', 'menu.txt')
const menu = fs.readFileSync(menuPath,'utf8')

const princialAnswer = 'Welcome Home'
const menuRestAnswer = 'This is the Restaurant Menu'
const reservasAnswer = 'When do you need the reservation ?'
const consultaAnswer = 'What can I help you ?'

const welcomeMedia = 'https://i.pinimg.com/originals/a3/43/2c/a3432c23b02559820dba08772e8fc26c.jpg'
const mediaFlowMenuRest = 
        `https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wordmstemplates.com
        %2Fwp-content%2Fuploads%2F2015%2F07%2Fmenu-template-5254.jpg
		&f=1&nofb=1&ipt=f2e2ba80af83e48e1e199befd22d82e09982e98f129f025107dd57b8735aebb5&ipo=images`


module.exports = {
    menu,
    welcomeMedia,
    mediaFlowMenuRest,
    princialAnswer,
    menuRestAnswer,
    reservasAnswer,
    consultaAnswer,
    apiKeyOpenAI
}