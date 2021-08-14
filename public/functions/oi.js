module.exports = async function (client, message) {
    let numberRequest;
        
    numberRequest = String(message.sender.id).split('@');
    await client.sendMentioned (message.chatId, `Vai se fuder @${numberRequest[0]} filha da puta!`, [numberRequest[0]]);
}
