module.exports = async function(client, message) {
    await client.reply(
        await message.chatId,
        `Comando não encontrado...\nEnvie *,menu* para ver a listas de comandos!`,
        await message.id
    );
}