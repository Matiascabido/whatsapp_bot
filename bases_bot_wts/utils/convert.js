const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)

async function convertOggToMp3 (inputSteam, outStream) {
    return new Promise((resolve, reject) => {
        ffmpeg(inputSteam).audioQuality(96).toFormat('mp3').save(outStream).on('progress', () => null).on('end', () => resolve(true))
    })
}

module.exports = { convertOggToMp3 }