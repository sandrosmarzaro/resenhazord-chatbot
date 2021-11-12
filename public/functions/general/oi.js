module.exports = async function (client, message) {
    let numberRequest;
    
    numberRequest = String(await message.sender.id).split('@');
    await client.sendMentioned (
        await message.chatId, 
        `Vai se fuder @${numberRequest[0]} filha da puta!`, 
        [numberRequest[0]]
    );
}
