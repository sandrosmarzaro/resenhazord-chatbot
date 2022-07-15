module.exports = async function (client, message, command) {

    const quoteMessage = await message.quotedMsg;
    if (quoteMessage != null) {
        if (quoteMessage.type == 'video') {
            const path = require('path');
            const filePath = path.join('public', 'images', 'video.mp4');
            const bufferVideo = await client.decryptFile(quoteMessage); 
            
            const fs = require('fs');
            fs.writeFile(filePath, bufferVideo, async function (err) {
                if (err) return console.log(err);
                try {
                    await client.sendFile(
                        await message.chatId, 
                        filePath, 
                        'video', 
                        'Aqui está o vídeo que você pediu!'
                    );
                }
                catch (err) {
                    console.log(err);
                    await client.sendText(
                        await message.chatId, 
                        "Não consegui enviar o vídeo..."
                    );
                }
            });
        }
        else {
            await client.sendText(
                await message.chatId, 
                "A mensagem marcada no comando não é um vídeo!"
            );
        }
    }
    else {
        await client.sendText(
            await message.chatId, 
            "O comando não marcou nenhum video!"
        );
    }
}