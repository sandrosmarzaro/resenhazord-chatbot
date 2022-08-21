module.exports = async function (client, message, command) {
    const ytdl = require('ytdl-core');
    const fs = require('fs');
    const path = require('path');
    const link = command.substring(4, command.length);
    const videoPath = path.join('public', 'images', 'youtube.mp4');

    try {
        const info = await ytdl.getInfo(link);
        ytdl(link).pipe(
            fs.createWriteStream(videoPath)
                .on('finish', async () => {
                    await client.sendFile(
                        await message.chatId, 
                        videoPath, 
                        "YouTube Video", 
                        `${info.videoDetails.title}`
                    );
                }
            )
        );
    }
    catch (error) {
        await client.sendText(
            await message.chatId,
            `Erro ao baixar o vídeo do YouTube...`
        );
    }
}