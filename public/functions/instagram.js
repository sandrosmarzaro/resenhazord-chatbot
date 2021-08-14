module.exports = async function (client, message, command) {
    const instagramGetUrl = require("instagram-url-direct");
    let links = await instagramGetUrl(command.substring(4, command.length));
    await client.sendFile(message.chatId, links['url_list'][0], `Instagram Video`, 'Aqui está seu vídeo do Instagram!');
}