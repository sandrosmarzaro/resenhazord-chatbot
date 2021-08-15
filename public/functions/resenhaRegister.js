module.exports = async function (client, message, command) {
    const fs = require('fs');
    const filePath = 'public/data/resenha.json';
    const fileBuffer = fs.readFileSync(filePath);
    const fileJson = JSON.parse(fileBuffer);
    let register = fileJson;

    if (command[5] === '0'){
        const membersArray = await client.getGroupMembersIds(message.chatId);
        membersArray.forEach(element => {
            register.push({
                "phone": element._serialized,
                "coin": 0,
                "antiban": false
            });
        });
        await client.sendText(await message.chatId, `Todas as carteiras foram zeradas com sucesso!`);
    }
    else {
        const newResenhista = (command.substring(6, command.length)) + '@c.us';
        register.push({
            "phone": newResenhista,
            "coin": 0,
            "antiban": false
        });
        await client.sendMentioned(await message.chatId,
            `Carteirinha do resenhista @${newResenhista} registrada com sucesso!`,
            [newResenhista]);
    }

    const fileString = JSON.stringify(register, null, '\t');
    fs.writeFileSync(filePath, fileString, 'utf-8');
}