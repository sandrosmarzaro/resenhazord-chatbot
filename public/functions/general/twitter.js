module.exports = async function (client, message, command) {
    const videoUrlLink = require('video-url-link');
    const link = command.substring(4, command.length);
    
    try {
        videoUrlLink.twitter.getInfo(link, {}, async (error, info) => {
            if (error) {
                console.error(error);
                await client.reply(
                    await message.chatId,
                    `O link deve ser de um video!`,
                    await message.messageId
                );
            }
            else {
                let linkMp4;
                let birateBigger;
                let firstMp4 = false;
                const infoVariants = await info.variants;
                infoVariants.forEach((element) => {
                    let contenType = element.content_type;
                    let turnBitrate = element.bitrate;
                    if ( !firstMp4 && (contenType === "video/mp4")) {
                        firstMp4 = true;
                        birateBigger = turnBitrate;
                        linkMp4 = element.url;
                    }
                    else if ((turnBitrate > birateBigger) && (contenType === "video/mp4")) {
                        birateBigger = element.bitrate;
                        linkMp4 = element.url;
                    }
                });
                await client.sendFile(
                    await message.chatId, 
                    linkMp4, 
                    `Twitter Video`, 
                    `${await info.full_text}`
                );
            }
        });
    }
    catch (err) {
        await client.sendText(message.chatId, 'Error ao baixar vídeo do Twitter!');
    }
}