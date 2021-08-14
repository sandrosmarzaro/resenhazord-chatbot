module.exports = async function (client, message) {
    const menu = require('../scripts/menuString');
    await client.sendText(message.chatId, menu);
}