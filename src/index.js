const venom = require('venom-bot');

venom.create().then((client) => start(client));

function start (client) {
    client.onAnyMessage(async (message) => {

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
                
                admArrayAdd = await client.getGroupAdmins ( message.chatId );
                for (let index = 0; index < admArrayAdd.length; index++) {
                    if ( admArrayAdd[index].user == "552899219566" ) {
                        isAdmAdd = true;
                    }
                }
                if ( isAdmAdd ) {
                    let added = false;
                    
                    do {
                        randomPhone = Math.random() * 10000000;
                        randomPhone = String(randomPhone).split(".");
                        randomPhone = randomPhone[0];
                        randomPhone = "552799" + randomPhone + "@c.us";

                        added = await client.addParticipant(message.chatId, randomPhone, [randomPhone]);
                    } while ( !added );
                }
                else {
                    await client.sendText(message.chatId, `Como não tenho administrador sugiro adicionar esse contato. Caso eu não envie é porque eu gerei um inexistente`);
                    await client.sendContactVcard(message.chatId, randomPhone, "Número Gerado").catch(async (err) => {
                        await client.sendText(message.chatId, `Gerei um número inexistente!`);
                    });
                }
            }
            else {
                await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo adicionar ninguém!`);
            }
        }
        
        else if ( message.body === ",rule34" ){
            const fs = require('fs');
            const puppeteer = require('puppeteer');

            (async () => {
                const browser = await puppeteer.launch({headless: true});
                const page = await browser.newPage();
                await page.goto(`https://rule34.xxx/index.php?page=post&s=random`);
                
                const rule34 = await page.evaluate(() => {
                    const nodeList = document.querySelectorAll('div.flexi img');
                    const imgArray = [...nodeList];
                    
                    const imgList = imgArray.map( ({src}) => ({
                        src
                    }));
                    
                    return imgList;
                });
                await client.sendImage(message.chatId, rule34[0]['src'], "rule34", "Aqui está sua imagem aleatória!");
                await browser.close();
            })();
        }
        
        else if ( message.caption === ",stic" || message.caption === ",sticrop" ){ 
            const fs = require('fs');
            const mime = require('mime-types');
            const WSF = require('wa-sticker-formatter');

            const buffer = await client.decryptFile(message);
            const fileName = `public/images/sticker.${mime.extension(message.mimetype)}`;
            fs.writeFile(fileName, buffer, async (err) => {
                
                const typeMedia = await message.mimetype.split('/');
                const image = fs.readFileSync('./' + fileName);
                let sticker;
                message.caption === ",sticrop" ? sticker = new WSF.Sticker(image, { crop: true, animated: false, pack: 'Resenha Pack', author: 'REZENHAZORD' }) 
                : sticker = new WSF.Sticker(image, { crop: false,  animated: false, pack: 'Resenha Pack', author: 'REZENHAZORD' });
                await sticker.build();
                const sticBuffer = await sticker.get();
                const pathSticker = "public/images/sticker.webp";
                
                fs.writeFile(pathSticker, sticBuffer, async (err) =>{
                    if ( message.mimetype === "image/gif" ) {

                        await client.sendImageAsStickerGif(message.chatId, pathSticker);
                    }   
                    else if ( typeMedia[0] === "image" ) {
                        
                        await client.sendImageAsSticker(message.chatId, pathSticker);
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