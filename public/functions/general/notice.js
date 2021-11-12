module.exports = async function (client, message, command) {
    const admNumber = "5528999223882@c.us";
    if (await message.author === admNumber) {
        const allGroups = await client.getAllChatsGroups();
        allGroups.forEach(element => {
            client.sendText(
                element.id._serialized,
                `${command.substring(4, command.length)}`
            );
        });
    }
}