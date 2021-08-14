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

            for (let index = 0; index < info.variants.length; index++) {

                if ( firstMp4 === 0 && info.variants[index]['content_type'] === "video/mp4") {

                    firstMp4++;
                    birateBigger = info.variants[index]['bitrate'];
                    linkMp4 = info.variants[index]['url'];
                }
                else if (info.variants[index]['bitrate'] > birateBigger && info.variants[index]['content_type'] === "video/mp4") {

                    birateBigger = info.variants[index]['bitrate'];
                    linkMp4 = info.variants[index]['url'];
                }
            }
            await client.sendFile(message.chatId, linkMp4, `Twitter Video`, `${info.full_text}`);
        }
    });
}