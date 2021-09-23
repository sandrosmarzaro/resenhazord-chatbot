module.exports = async function(client, message, command) {
    const resenhaList = require('../auxiliary/resenhaLoadList');
    const exists = require('../auxiliary/resenhaNumberExists');
    let resenhistaPhone;
    let resenhistaId;
    let coin;
    let name;

    if ( await command.length === 5) {
        resenhistaId = message.author;
        resenhistaPhone = resenhistaId.split('@');
        resenhistaPhone = resenhistaPhone[0];
    }
    else {
        resenhistaId = command.split(' ');
        resenhistaId = resenhistaId[1].split('@');
        resenhistaPhone = resenhistaId[1];
        resenhistaId = resenhistaId[1] + '@c.us';
    }

    const resenhistaExists = await exists(resenhistaId);
    if ( resenhistaExists ) {
        resenhaList.forEach(element => {
            if ( element.id === resenhistaId) {
                coin = element.coin;
                name = element.name;
            }
        });
        await client.sendText(await message.chatId, `O coin de _${name}_ é *R₡ ${coin}*`);
    }
    else {
        await client.sendText(await message.chatId, `Não encontrei a carterinha de *${resenhistaPhone}*`);
    }
}