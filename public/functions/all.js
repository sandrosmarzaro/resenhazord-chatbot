module.exports = async function (client, message, command) {
    if ( message.isGroupMsg ) {
        let members;
        let users = [];
        let contacts = '';

        members = await client.getGroupMembersIds(message.chatId);

        for ( member of members ) {
            let user = String(member.user);
            users.push(user);
        }

        for ( user of users ) {
            let contact = '@' + String(user) + ' ';
            contacts += contact;
        }
        await client.sendMentioned(message.chatId, `${command.substring(5, command.length)} ${contacts}`, users);
    }
    else {
        await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo marcar ninguém!`);
    }
}