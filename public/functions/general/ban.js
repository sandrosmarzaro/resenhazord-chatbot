module.exports = async function (client, message, command) {
    if ( message.isGroupMsg ){
        let isAdm = false;
        const resenhazordPhone = "5528999652953";
        const admList = await client.getGroupAdmins (message.chatId);
        admList.forEach((element) => {
            if ( element.user ===  resenhazordPhone) {
                isAdm = true;
            }
        });
        const membersList = await client.getGroupMembers (message.chatId);
        const randomIndexMember = Math.floor(Math.random() * membersList.length);
        
        if ( isAdm ) {
            if ( (command.substring(5, command.length)).length > 0 ) {
                let number2Ban = command.substring(5, command.length).split('@');
                number2Ban = number2Ban[1] + '@c.us';
                
                let haveMember = false;
                for (let index = 0; index < membersList.length; index++) {
                    if ( membersList[index].id._serialized === number2Ban ) {
                        haveMember = true;
                    }
                }
                if ( haveMember ) {
                    await client.removeParticipant(await message.chatId, number2Ban);
                }
                else {
                    await client.reply(
                        await message.chatId, 
                        `Não encontrei esse usuário para banir!`,
                        await message.id
                    );
                }
    
            }
            else if ( membersList[randomIndexMember].id.user === "552899223882" ) {
                // await client.sendText(message.chatId, `Ops! Tentei me banir...`);
            }
            else{
                await client.removeParticipant(
                    message.chatId, 
                    membersList[randomIndexMember].id._serialized
                );
            }  
        }
        else{
            await client.sendMentioned(
                await message.chatId, 
                `Como não tenho administrador sugiro banir o(a) @${membersList[randomIndexMember].id.user}`, 
                [membersList[randomIndexMember].id.user]
            );
        }
    }
    else{
        await client.reply(
            await message.chatId, 
            `Aqui é uma conversa privada, não consigo banir ninguém!`,
            await message.id
        );
    }
}
