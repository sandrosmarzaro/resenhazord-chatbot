module.exports = async function (client, message, command){
    if ( message.isGroupMsg ) {
        let admArrayAdd;
        let randomPhone;
        let randomNumber;
        let added = false;
        let isAdmAdd = false;
        let correctDDD = false;
        let numberInsert = command.substring(5,command.length);
        const dddList = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,
            34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,
            65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92
            ,93,94,95,96,97,98,99];
        
        admArrayAdd = await client.getGroupAdmins( message.chatId );
        for (let index = 0; index < admArrayAdd.length; index++) {
            if ( admArrayAdd[index].user == "552899223882" ) {
                isAdmAdd = true;
            }
        }
        do {
            if ( isAdmAdd ) {         
                if ( numberInsert.length === 0 ) {
                    added = true;
                    await client.sendText(message.chatId, "Número não inserido! Não consigo adiconar sem ele.");
                }
                else {
                    for (let index = 0; index < dddList.length; index++) {
                        if ( numberInsert.substring(0,2) == dddList[index] ) {
                            correctDDD = true;
                        }
                    }
                    if ( correctDDD ) {
                        randomPhone = "55" + numberInsert.substring(0, numberInsert.length);
                        for (let index = numberInsert.substring(2, numberInsert.length).length; index < 9; index++) {
                            randomNumber = Math.random() * 10;
                            randomNumber = String(randomNumber).split(".");
                            randomPhone += randomNumber[0];
                        }
                        randomPhone += "@c.us";
                        added = await client.addParticipant(message.chatId, randomPhone, [randomPhone]);   
                    }
                    else {
                        added = true;
                        await client.sendText(message.chatId, "DDD inserido não existe no Brasil! Não consegui adiconar o número.");
                    }
                }                                                       
            }
            else {
                await client.sendText(message.chatId, `Não tenho administrador para adicionar alguém!`);
                added = 1;
            }
        } while ( !added );
    }
    else {
        await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo adicionar ninguém!`);
    }
}