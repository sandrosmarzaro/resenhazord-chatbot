module.exports = async function (client, message, command) {
    if (await message.author === "5528999223882@c.us") {
        const allGroups = await client.getAllChatsGroups();
        for (let index = 0; index < allGroups.length; index++) {
            await client.sendText(allGroups[index].id._serialized,`${command.substring(4, command.length)}`);
        }
    }
}