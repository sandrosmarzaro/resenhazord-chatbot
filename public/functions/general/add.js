module.exports = async function (client, message, command){
    if ( message.isGroupMsg ) {
        let admList;
        let randomPhone = "55";
        let randomNumber;
        let added = false;
        let isAdm = false;
        let correctDDi = false;
        const resenhazordPhone = "5528999652953";
        const datasCommand = command.split(' ');
        const insertPhone = datasCommand[1];
        const ddiList = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,
            34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,
            65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92
            ,93,94,95,96,97,98,99];
        
        admList = await client.getGroupAdmins(message.chatId);
        admList.forEach(element => {
            if ( element.user === resenhazordPhone ) {
                isAdm = true;
            }
        });
        let count = 0;
        do {
            count++;
            if ( isAdm ) {         
                if ( insertPhone === 0 ) {
                    added = true;
                    await client.sendText(message.chatId, 
                    "Número não inserido! Não consigo adiconar sem ele.");
                }
                else {
                    const insertDDi = insertPhone.substring(0, 2);
                    ddiList.forEach(element => {
                        if (element == insertDDi) {
                            correctDDi = true;
                        }
                    });
                    if ( correctDDi ) {
                        randomPhone += insertPhone;
                        for (let index = insertPhone.length; index  < 11; index++) {
                            randomNumber = Math.floor(Math.random() * 10);
                            randomPhone += randomNumber;
                        }
                        randomPhoneId = randomPhone + "@c.us";
                        added = await client.addParticipant(await message.chatId, 
                        randomPhoneId, [randomPhone]);
                        if ( added ) {
                            await client.sendText(
                                await message.chatId,
                                `Depois de ${count} números gerados, achei esse:`
                            );
                            randomPhone = "55";
                        } 
                    }
                    else {
                        added = true;
                        await client.sendText(message.chatId, 
                        "DDi inserido não existe no Brasil! Não consegui adiconar o número.");
                    }
                }                                                       
            }
            else {
                await client.sendText(
                    message.chatId, 
                    `Não tenho administrador para adicionar alguém!`
                );
                added = 1;
            }
        } while ( !added );
    }
    else {
        await client.sendText(
            message.chatId, 
            `Aqui é uma conversa privada, não consigo adicionar ninguém!`
        );
    }
}