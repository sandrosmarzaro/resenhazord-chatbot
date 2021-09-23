module.exports = async function (client, message, command) {
    const ytdl = require('ytdl-core');
    const fs = require('fs');
    const link = command.substring(4, command.length);
    const videoPath = "public/images/youtube.mp4";

    const info = await ytdl.getInfo(link);
    ytdl(link).pipe(
        fs.createWriteStream(videoPath)
            .on('finish', async () => {
                // console.log(info);
                await client.sendFile(message.chatId, videoPath, "YouTube Video", `${info.videoDetails.title}`)}
        ));
}