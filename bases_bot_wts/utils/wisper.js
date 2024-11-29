const { downloadMediaMessage } = require('@adiwajshing/baileys')
const { voiceToText } = require('../utils/groq')
const fs = require('fs')
const { convertOggToMp3 } = require('./convert')

async function handlerAI(ctx) {
    const buffer = await downloadMediaMessage(ctx, 'buffer')
    const pathTmpOgg = `${process.cwd()}/tmp/voice-note-${Date.now()}.ogg`
    const pathTmpMp3 = `${process.cwd()}/tmp/voice-note-${Date.now()}.mp3`
    await fs.writeFileSync(pathTmpOgg, buffer)
    await convertOggToMp3(pathTmpOgg, pathTmpMp3)
    const text = await voiceToText(pathTmpMp3)
    fs.unlink(pathTmpMp3, (error) => {
        if(error) throw error
    })
    fs.unlink(pathTmpOgg, (error) => {
        if(error) throw error
    })
    return text
}

module.exports = { handlerAI }