module.exports = async function (client, message) {
    const menu = require('../../scripts/menuString');
    await client.reply(await message.chatId, menu, await message.id);
}