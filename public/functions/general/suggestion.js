module.exports = async function (client, message, command) {
    
    function Sugestion(contactName, phoneId, groupName, chatId, text) {
        this.contactName = contactName;
        this.phoneId =  phoneId;
        this.groupName = groupName;
        this.chatId =  chatId;
        this.text = text;
    }

    const sugestionText = command.substring(6, command.length);
    sugestion = new Sugestion(
        await message.sender.pushname,
        await message.author,
        await message.chat.name,
        await message.chatId,
        sugestionText
    );

    const fs = require('fs');
    const filePath = "public/data/sugestion.json";
    
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    const fileJson = JSON.parse(jsonString)
    // fs.writeFile(path, ,(err) => {console.error});

    await client.sendText(message.chatId, `Sua sugestão/aviso foi enviada com sucesso!\nObrigado pela colaboração!`);
}