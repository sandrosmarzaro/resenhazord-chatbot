module.exports = async function (client, message) {
    const path = require('path');
    const filePath = path.join('..', '..', 'scripts', 'menuString.js');
    const menu = require(filePath);
    await client.reply(await message.chatId, menu, await message.id);
}