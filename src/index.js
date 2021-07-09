const venom = require('venom-bot');

venom.create(
    'Resenhazord',
    (base64Qrimg, asciiQR, attempts, urlCode) => {
        //   console.log('Number of attempts to read the qrcode: ', attempts);
        //   console.log('Terminal qrcode: ', asciiQR);
        //   console.log('base64 image string qrcode: ', base64Qrimg);
        //   console.log('urlCode (data-ref): ', urlCode);
    },
    (statusSession, session) => {
        //   console.log('Status Session: ', statusSession);
        //   console.log('Session name: ', session);
    },
    {
        //   folderNameToken: 'tokens',
        //   mkdirFolderToken: '',
        //   headless: true,
        //   devtools: false,
        useChrome: false,
        //   debug: false,
        //   logQR: true,
        //   browserWS: '',
        //   browserArgs: [''],
        //   puppeteerOptions: {},
        //   disableSpins: true,
        //   disableWelcome: true,
        //   updatesLog: true,
        //   autoClose: 60000,
        //   createPathFileToken: false,
    }
).then((client) => start(client));

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
            const filePath = 'public/scripts/borges.json';

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

        else if (message.body == ',all') {
            if (message.isGroupMsg) {
                let members;
                let users = [];
                let contacts = '';
        
                members = await client.getGroupMembersIds(message.chatId);
        
                //cria uma array com os ids dos integrantes
                for ( member of members ) {
                    let user = String(member.user);
                    users.push(user);
                }
        
                //formata os ids em tagged('@0000000000000 ')
                //cria uma string com todas as tag
                for ( user of users ) {
                    let contact = '@' + String(user) + ' ';
                    contacts += contact;
                }
        
                //envia a mensagem marcando os integrantes
                await client.sendMentioned(message.chatId, `Chamando todos os cornos ${contacts}`, users);
            }
            else {
                await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo marcar várias pessoas!`);
            }
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
                    await client.sendMentioned(message.chatId, `Como não tenho administrador sugiro banir o(a) @${membersArray[randomIndexMember].id.user}`, [membersArray[randomIndexMember].id.user]);
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
                let added = false;
                do {
                    if ( isAdmAdd ) {                                                
                        randomPhone = Math.random() * 10000000;
                        randomPhone = String(randomPhone).split(".");
                        randomPhone = randomPhone[0];
                        randomPhone = "552799" + randomPhone + "@c.us";

                        added = await client.addParticipant(message.chatId, randomPhone, [randomPhone]);                        
                    }
                    else {
                        await client.sendText(message.chatId, `Como não tenho administrador sugiro adicionar esse contato. Caso eu não envie é porque eu gerei um inexistente`);
                        await client.sendContactVcard(message.chatId, randomPhone, [randomPhone], "Número Gerado");
                        added = true;
                    }
                } while ( !added );
            }
            else {
                await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo adicionar ninguém!`);
            }
        }
        
        else if ( message.body === ",img" ){
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

                if ( typeMedia[0] === "video" ) {
                    
                    message.caption === ",sticrop" ? 
                    stickerGif = new WSF.Sticker(image, { 
                        crop: true, 
                        animated: true, 
                        pack: 'Resenha Pack', 
                        author: 'REZENHAZORD' 
                    }) 
                    : stickerGif = new WSF.Sticker(image, { 
                        crop: false,  
                        animated: true, 
                        pack: 'Resenha Pack', 
                        author: 'REZENHAZORD' });

                    await stickerGif.build();
                    const sticGifBuffer = await stickerGif.get();
                    const pathGifSticker = "public/images/sticker.gif";

                    fs.writeFile(pathGifSticker, sticGifBuffer, async (err) =>{
                        await client.sendImageAsStickerGif(message.chatId, pathGifSticker);
                    });
                }

                else if ( typeMedia[0] === "image" ) {

                    message.caption === ",sticrop" ? 
                    sticker = new WSF.Sticker(image, { 
                        crop: true, 
                        animated: false, 
                        pack: 'Resenha Pack', 
                        author: 'REZENHAZORD' }) 
                    : sticker = new WSF.Sticker(image, { 
                        crop: false,  
                        animated: false, 
                        pack: 'Resenha Pack', 
                        author: 'REZENHAZORD' });

                    await sticker.build();
                    const sticBuffer = await sticker.get();
                    const pathSticker = "public/images/sticker.webp";

                    fs.writeFile(pathSticker, sticBuffer, async (err) =>{
                        await client.sendImageAsSticker(message.chatId, pathSticker);
                    });
                }                
            });
        }
        
        // else if ( (message.isMedia === false  && message.body.substring(0, 3) == ',ig') || message.body === ',ig') {
        //     const instagram_download = require ('@juliendu11/instagram-downloader');
        //     const fs = require ('fs');
        //     let link;
            
        //     if ( message.body === ',ig' ) {
        //         link = String(message.quotedMsg.body).split('?')[0];
        //     }
        //     else {
        //         link = String(message.body.substring(4)).split('?')[0];
        //     }

        //     const value = await instagram_download.downloadMedia(link, 'public/images/');
        //     console.log(value.file);
        //     await client.sendFile(message.chatId, value.file, 'Instagram Video', 'Aqui está seu vídeo do Instagram!').catch((err) => {
        //         console.log(`\nerr:\n${err}\n`);                
        //     });       

        //     fs.unlink(value.file, (err) => {
        //         if (err) throw err;
        //         console.log(err);
        //     });
        //     if ( value.type === 'Video' ){
        //         fs.unlink(value.thumbnail, (err) => {
        //             if (err) throw err;
        //             console.log(err);
        //         });
        //     }
        // }

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