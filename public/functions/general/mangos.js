module.exports = async function (client, message) {
    const maxNumber = 100;
    let numberRandom = (Math.random() * maxNumber).toFixed(2).replace('.', ',');
    await client.sendText(
        await message.chatId, 
        `A chance de Mangos II nascer agora é ${numberRandom} %`,
    );
}