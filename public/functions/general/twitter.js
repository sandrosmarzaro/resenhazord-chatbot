module.exports = async function (client, message, command) {
    const videoUrlLink = require('video-url-link');
    const link = command.substring(5, command.length);

    videoUrlLink.twitter.getInfo(link, {}, async (error, info) => {
        if (error) {
            console.error(error);
        }
        else {
            let linkMp4;
            let birateBigger;
            let firstMp4 = 0;
            info.variants.forEach((element) => {
                let contenType = element.content_type;
                let turnbirate = element.bitrate;
                if ( (firstMp4 === 0) && (contenType === "video/mp4")) {
                    firstMp4++;
                    birateBigger = turnbirate;
                    linkMp4 = element.url;
                }
                else if (turnbirate > birateBigger && contenType === "video/mp4") {
                    birateBigger = element.bitrate;
                    linkMp4 = element.url;
                }
            });
            await client.sendFile(
                message.chatId, 
                linkMp4, 
                `Twitter Video`, 
                `${info.full_text}`
            );
        }
    });
}