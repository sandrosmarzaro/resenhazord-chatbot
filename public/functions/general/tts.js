module.exports = async function (client, message, command) {
    const googleTTS = require('google-tts-api');
    if ( command.substring(0, 4) === ",tts" ) {
        const language = command.substring(5, 10);
        const text = command.substring(11, command.length);
        const audioUrl = googleTTS.getAudioUrl(text, {
            lang: language,
            slow: false,
            host: 'https://translate.google.com',
        });
        await client.sendVoice(message.chatId, audioUrl);
    }
}