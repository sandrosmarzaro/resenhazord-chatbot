const venom = require('venom-bot');

venom.create().then((client) => start(client));

function start (client) {
    client.onMessage(async (message) => {

        if ( message.body === ",menu" ) {
            const menu = require('../public/scripts/menuString');
            await client.sendText(message.chatId, menu);
        }

        else if ( message.body === ",oi" ){
            let numberRequest;

            numberRequest = String(message.sender.id).split('@');
            await client.sendMentioned (message.chatId, `Vai se fuder @${numberRequest[0]} filha da puta!`, [numberRequest[0]]);
        }
        
        else if ( message.body === ",borges" ){
            const fs = require('fs');
            const filePath = '../public/scripts/borges.json';

            const fileBuffer = fs.readFileSync(filePath, 'utf-8');
            const fileJson = JSON.parse(fileBuffer);
            let borges = fileJson;

            borges.nargas++;
            await client.sendText(message.chatId, `O Borges já fumou ${borges.nargas} nargas`);

            const fileString = JSON.stringify(borges);
            fs.writeFileSync(filePath, fileString);
        }

        else if ( message.body === ",mateus" ){
            const swearingString = require('../public/scripts/swearingString.js');
            let swearingArray;
            let randomIndex;
            let maxSwearing;
                
            swearingArray = swearingString.split(",");
            maxSwearing = swearingArray.length;
            randomIndex = Math.random() * maxSwearing;
            randomIndex = Number.parseInt(randomIndex);
            await client.sendText(message.chatId, `Mateus vocé é${swearingArray[randomIndex]}`);
        }
            
        else if ( message.body === ",mangos" ){
            let numberRandom;
            const maxNumber = 100;

            numberRandom = Math.random() * maxNumber;
            numberRandom = numberRandom.toFixed(2);
            numberRandom = numberRandom.replace('.', ',');
            await client.sendText(message.chatId, `A chance de Mangos II nascer agora é ${numberRandom} %`);
        }

        else if ( message.body === ",ban" ){
            let admArray;
            let membersArray;
            let randomIndexMember;
            let isAdm = false;

            if ( message.isGroupMsg ){
                admArray = await client.getGroupAdmins ( message.chatId );
                membersArray = await client.getGroupMembers ( message.chatId );
                
                randomIndexMember = Math.random() * membersArray.length;
                randomIndexMember = Number.parseInt ( randomIndexMember );
            
                for ( let index = 0; index < admArray.length; index++ ) {
                    if ( admArray[index].user == "552899219566" ) {
                        isAdm = true;
                    }
                }
                if ( isAdm ) {
                    if ( membersArray[randomIndexMember].id.user === "552899219566" ) {
                        await client.sendText(message.chatId, `Ops! Tentei me banir...`);
                    }
                    else{
                        await client.removeParticipant(message.chatId, membersArray[randomIndexMember].id._serialized);
                    }  
                }
                else{
                    await client.sendMentioned(message.chatId, `Como não tenho administrador sugiro banir o @${membersArray[randomIndexMember].id.user}`, [membersArray[randomIndexMember].id.user]);
                }
            }
            else{
                await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo banir ninguém!`);
            }
        }
        
        else if ( message.body === ",add" ) {
            if ( message.isGroupMsg ) {
                let admArrayAdd;
                let randomPhone;
                let isAdmAdd = false;
                
                randomPhone = Math.random() * 10000000;
                randomPhone = String(randomPhone).split(".");
                randomPhone = randomPhone[0];
                randomPhone = "552799" + randomPhone + "@c.us";
                admArrayAdd = await client.getGroupAdmins ( message.chatId );
                
                for (let index = 0; index < admArrayAdd.length; index++) {
                    if ( admArrayAdd[index].user == "552899219566" ) {
                        isAdmAdd = true;
                    }
                }
                if ( isAdmAdd ) {
                    let added = false;
                    
                    added = await client.addParticipant(message.chatId, randomPhone, [randomPhone]).catch((error) => {});
                    if ( !added ) {
                        await client.sendText(message.chatId, `Gerei um número inexistente!`);
                    }
                }
                else {
                    await client.sendText(message.chatId, `Como não tenho administrador sugiro adicionar esse contato. Caso eu não envie é porque eu gerei um inexistente`);
                    try{
                        await client.sendContactVcard(message.chatId, randomPhone, "Número Gerado");
                    }
                    catch(newError) {
                        await client.sendText(message.chatId, `Gerei um número inexistente!`);
                    }
                }
            }
            else {
                await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo adicionar ninguém!`);
            }
        }
        
        else if ( message.body === ",img" ){
            const link = "https://source.unsplash.com/random";

            await client.sendImage(message.chatId, link, "randomImage", "Aqui está sua imagem aleatória!");
        }
        
        else if ( message.body === ",sticker" ){ 
            /*
            if ( message.isMedia != false  ) {
                const fs = require('fs');            
                const WSF = require('wa-sticker-formatter');
                const mime = require('mime-types');
                const image = './src/datas/atencao.jpg';
                const sticker = new WSF.Sticker(image, { crop: false, animated: false, pack: 'Resenha Pack', author: 'RESENHAZORD' });
                await sticker.build();
                const sticBuffer = await sticker.get();
                
                fs.writeFile('./src/datas/sticker.webp', sticBuffer, (err) => {
                    client.sendImageAsSticker(message.chatId, './src/datas/sticker.webp');
                    if (err) {
                        console.log("Error: ", err);
                    }
                });
            }*/
            
            const fs = require('fs');            
            const WSF = require('wa-sticker-formatter');
            const mime = require('mime-types');

            const buffer = await client.decryptFile(message);
            const fileName = `../public/images/sticker.${mime.extension(message.mimetype)}`;

            fs.writeFile(fileName, buffer, async (error) => {
                
                const sticker = new WSF.Sticker(fileName, { crop: false, animated: false, pack: 'Resenha Pack', author: 'RESENHAZORD' });
                await sticker.build();
                const sticBuffer = await sticker.get();
                if ( error ) {
                    console.log("Error: ", err);
                }

                fs.writeFile('../public/images/sticker.webp', sticBuffer, async (err) => {
                    await client.sendImageAsSticker(message.chatId, '../public/images/sticker.webp');
                    if ( err ) {
                        console.log("Error: ", err);
                    }
                });
            });
        }

        else if ( message.body === ",adm" ){
            let admList;
            let isAdm = false;

            if ( message.isGroupMsg ) {
                admList = await client.getGroupAdmins ( message.chatId );
                for (let index = 0; index < admList.length; index++){
                    if (admList[index].user == "552899219566"){
                        isAdm = true;
                    }
                }
                if ( isAdm ) {
                    for (let index = 0; index < admList.length; index++){
                        if (admList[index].user != "552899219566"){
                            await client.demoteParticipant(message.chatId, (admList[index].user + "@c.us"));
                        }
                    }
                    await client.sendText(message.chatId, `Grupo dominado!`);
                }
            }
        }
    });
}