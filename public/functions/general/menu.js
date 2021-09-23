module.exports = async function (client, message) {
    const menu = require('../../scripts/menuString');
    await client.sendText(await message.chatId, menu);
}