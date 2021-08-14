module.exports = async function (client, message) {
    let numberRandom;
    const maxNumber = 100;

    numberRandom = Math.random() * maxNumber;
    numberRandom = numberRandom.toFixed(2);
    numberRandom = numberRandom.replace('.', ',');
    await client.sendText(message.chatId, `A chance de Mangos II nascer agora é ${numberRandom} %`);
}