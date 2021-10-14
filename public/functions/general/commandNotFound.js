module.exports = async function(client, message) {
    const senderId = await message.author;
    const senderDatas = senderId.split('@');
    const senderPhone = senderDatas[0];

    await client.sendMentioned(
        await message.chatId,
        `Comando não encontrado _@${senderPhone}_\nEnvie *,menu* para ver a listas de comandos!`,
        [senderPhone]
    )
}