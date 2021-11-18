module.exports = async function (client, message, command) {
    const videoUrlLink = require('video-url-link');
    const link = command.substring(5, command.length);

    videoUrlLink.twitter.getInfo(link, {}, async (error, info) => {
        if (error) console.error(error);
        else {
            let linkMp4;
            let birateBigger;
            let firstMp4 = 0;
            const infoVariants = await info.variants;
            infoVariants.forEach((element) => {
                let contenType = element.content_type;
                let turnBitrate = element.bitrate;
                if ( (firstMp4 === 0) && (contenType === "video/mp4")) {
                    firstMp4++;
                    birateBigger = turnBitrate;
                    linkMp4 = element.url;
                }
                else if (turnBitrate > birateBigger && contenType === "video/mp4") {
                    birateBigger = element.bitrate;
                    linkMp4 = element.url;
                }
            });
            await client.sendFile(
                await message.chatId, 
                linkMp4, 
                `Twitter Video`, 
                `${infoVariants.full_text}`
            );
        }
    });
}