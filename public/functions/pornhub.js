module.exports = async function (client, message) {
    const pornhub = require('@justalk/pornhub-api');
    const url = 'https://pt.pornhub.com/random';
    let video;
    do{
        video = await pornhub.page(url, ['title','pornstars','download_urls']);
        
    } while (video[1]['error'] === 'An error occured')

    await client.sendText(message.chatId, video);
}