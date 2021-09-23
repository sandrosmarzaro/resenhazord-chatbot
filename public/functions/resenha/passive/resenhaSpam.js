module.exports = async function(client, message) {
    const fs = require('fs');
    const filePath = 'public/data/resenha/spam.json';
    const fileBuffer = fs.readFileSync(filePath);
    const fileJson = JSON.parse(fileBuffer);
    let resenhaList = fileJson;

    const register = require('../auxiliary/resenhaLoadList');
    const writeList = require('../auxiliary/resenhaWriteList');
    const spamPhoneGarbage = message.author.split('@');
    const spamPhone = spamPhoneGarbage[0];

    if ( !resenhaList.first || (resenhaList.first && (resenhaList.id !== message.author))) {
        resenhaList.phone = await message.author;
        resenhaList.first = true;
        resenhaList.second = false;
        resenhaList.third = false;
        resenhaList.fourth = false;
        resenhaList.fifth = false;
    }
    else if ( resenhaList.id === message.author ) {
        if ( resenhaList.first ) {
            resenhaList.second = true;
        }
        else if ( resenhaList.second ) {
            resenhaList.third = true;
        }
        else if ( resenhaList.third ) {
            resenhaList.fourth = true;
        }
        else if ( resenhaList.fourth ) {
            resenhaList.fifth = true;
            register.forEach(element => {
                if ( element.id === message.author ) {
                    element.coin -= 70;
                }
            });
            writeList(register);
            await client.sendMentioned(await message.chatId,
            `Detectei seu spam @${spamPhone} filha da puta! Fica sem R₡ 70 aí\nVocê foi avisado...`,
            [spamPhone]);
        }
        else {
            register.forEach(element => {
                if ( element.id === message.author ) {
                    element.coin -= 150;
                }
            });
            writeList(register);
            await client.sendMentioned(await message.chatId,
            `Eu avisei comédia sobre seu spam... Agora @${spamPhone} perde R₡ 150 pra ficar esperto`,
            [spamPhone]);
        }
    }
    const fileString = JSON.stringify(resenhaList, null, '\t');
    fs.writeFileSync(filePath, fileString, 'utf-8');
    
}