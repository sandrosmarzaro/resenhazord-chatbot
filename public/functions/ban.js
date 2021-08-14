module.exports = async function (client, message, command) {
    if ( message.isGroupMsg ){
        let isAdm = false;
        let admArray = await client.getGroupAdmins ( message.chatId );
        for ( let index = 0; index < admArray.length; index++ ) {
            if ( admArray[index].user == "552899223882" ) {
                isAdm = true;
            }
        }
    
        let membersArray = await client.getGroupMembers ( message.chatId );
        let randomIndexMember = Math.random() * membersArray.length;
        randomIndexMember = Number.parseInt ( randomIndexMember );
        
        if ( isAdm ) {
            if ( (command.substring(5, command.length)).length > 0 ) {
                let number2Ban = command.substring(5, command.length).split('@');
                number2Ban = number2Ban[1] + '@c.us';
                
                let haveMember = false;
                for (let index = 0; index < membersArray.length; index++) {
                    if ( membersArray[index].id._serialized === number2Ban ) {
                        haveMember = true;
                    }
                }
                if ( haveMember ) {
                    await client.removeParticipant(message.chatId, number2Ban);
                }
                else {
                    await client.sendText(await message.chatId, `Não encontrei esse usuário para banir!`);
                }
    
            }
            else if ( membersArray[randomIndexMember].id.user === "552899223882" ) {
                // await client.sendText(message.chatId, `Ops! Tentei me banir...`);
            }
            else{
                await client.removeParticipant(message.chatId, membersArray[randomIndexMember].id._serialized);
            }  
        }
        else{
            await client.sendMentioned(message.chatId, 
                `Como não tenho administrador sugiro banir o(a) @${membersArray[randomIndexMember].id.user}`, 
                [membersArray[randomIndexMember].id.user]);
        }
    }
    else{
        await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo banir ninguém!`);
    }
}
