module.exports = async function (client, message) {
    const path = require('path');
    const filePath = path.join('..', '..', 'scripts', 'menuString.js');
    const menu = require(filePath);
    await client.sendText(await message.chatId, menu);
}