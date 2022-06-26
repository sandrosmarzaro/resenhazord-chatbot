module.exports = async function(client, message, command) {
    
    const messageSplit = command.split('');
    const chatId = messageSplit[1];
    const messageTyped = messageSplit[2];
    const warning = "⚠️ Mensagem enviada por um usuário anônimo para este chat.\n\n";
    await client.sendText(chatId, warning + messageTyped);
    await client.sendText(
        message.chatId, 
        "Messagem enviada com sucesso!"
    );
}