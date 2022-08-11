module.exports = async function(client, message) {
    let numberRequest;
    numberRequest = String(await message.sender.id).split('@');
    
    const maxNumber = 20;
    let numberRandom = Math.floor(Math.random() * maxNumber) + 1;
    await client.sendMentioned(
        await message.chatId, 
        `@${numberRequest[0]} sua ROLAgem deu ${numberRandom}`,
        [numberRequest[0]]
    );
}