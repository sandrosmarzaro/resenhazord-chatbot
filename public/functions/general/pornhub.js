module.exports = async function (client, message) {

    const pornhub = require('@justalk/pornhub-api');
    const m3u8ToMp4 = require("m3u8-to-mp4");
    let videoQuality;
    let video;

    do {
        const url = 'https://pt.pornhub.com/random';
        video = await pornhub.page(url, ['title','download_urls', 'duration']);

        try {
            if (video['download_urls']['240P'] !== undefined) {
                if (video['duration'] < 180) {
                    videoQuality = '240P';
                }
                else {
                    videoQuality = false;
                }
            }
        }
        catch (error) {
            console.error(error);
            videoQuality = false;
        }
    } while (!videoQuality);
    
    const link = video['download_urls'][videoQuality];
    
    const converter = new m3u8ToMp4();

    (async function() {
        const fileName = 'porn.mp4';
        const path = require('path');
        const videoPath = path.join('public', 'images', fileName);
        await converter
        .setInputFile(link)
        .setOutputFile(videoPath)
        .start();
        try {
            await client.sendFile(
                await message.chatId, 
                videoPath, 
                video['title'], 
                video['title']
            );
        }
        catch (error) {
            console.error(error);
        }
    })();
}