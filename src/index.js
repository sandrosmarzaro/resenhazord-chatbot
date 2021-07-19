const { video } = require('@justalk/pornhub-api');
const path = require('path');
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
        useChrome: true,
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
        
        else if (message.body.substring(0,4) == ',all') {
            
            if ( message.isGroupMsg ) {
                let members;
                let users = [];
                let contacts = '';
        
                members = await client.getGroupMembersIds(message.chatId);
        
                for ( member of members ) {
                    let user = String(member.user);
                    users.push(user);
                }

                for ( user of users ) {
                    let contact = '@' + String(user) + ' ';
                    contacts += contact;
                }
                await client.sendMentioned(message.chatId, `${message.body.substring(5, message.body.length)} ${contacts}`, users);
            }
            else {
                await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo marcar ninguém!`);
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
        
        else if ( message.body.substring(0,4) === ",add" ) {
            if ( message.isGroupMsg ) {
                let admArrayAdd;
                let randomPhone;
                let randomNumber;
                let added = false;
                let isAdmAdd = false;
                let correctDDD = false;
                let numberInsert = message.body.substring(5,message.body.length);
                const dddList = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,
                    34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,
                    65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92
                    ,93,94,95,96,97,98,99];
                
                admArrayAdd = await client.getGroupAdmins ( message.chatId );
                for (let index = 0; index < admArrayAdd.length; index++) {
                    if ( admArrayAdd[index].user == "552899219566" ) {
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

        // else if (message.body === ",porn") {
        //     const pornhub = require('@justalk/pornhub-api');
        //     const url = 'https://pt.pornhub.com/random';
        //     let video;
        //     do{
        //         video = await pornhub.page(url, ['title','pornstars','download_urls']);
                
        //     } while (video[1]['error'] === 'An error occured')

        //     console.log(video);
        // }
        
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

        else if (message.body.substring(0, 3) === ",ig") {
            const instagramGetUrl = require("instagram-url-direct");
            let links = await instagramGetUrl(message.body.substring(4, message.body.length));
            await client.sendFile(message.chatId, links['url_list'][0], `Instagram Video`, 'Aqui está seu vídeo do Instagram!');
        }
        
        else if ( message.body.substring(0, 3) === ",tt" ) {
            const videoUrlLink = require('video-url-link');
            const link = message.body.substring(5, message.body.length);

            videoUrlLink.twitter.getInfo(link, {}, async (error, info) => {
                if (error) {
                    console.error(error);
                }
                else {

                    let linkMp4;
                    let birateBigger;
                    let firstMp4 = 0;

                    for (let index = 0; index < info.variants.length; index++) {

                        if ( firstMp4 === 0 && info.variants[index]['content_type'] === "video/mp4") {

                            firstMp4++;
                            birateBigger = info.variants[index]['bitrate'];
                            linkMp4 = info.variants[index]['url'];
                        }
                        else if (info.variants[index]['bitrate'] > birateBigger && info.variants[index]['content_type'] === "video/mp4") {

                            birateBigger = info.variants[index]['bitrate'];
                            linkMp4 = info.variants[index]['url'];
                        }
                    }
                    await client.sendFile(message.chatId, linkMp4, `Twitter Video`, `${info.full_text}`);
                }
            });
        }

        else if ( message.body.substring(0, 3) === ",yt" ) {
            const ytdl = require('ytdl-core');
            const fs = require('fs');
            const link = message.body.substring(4, message.body.length);
            const videoPath = "public/images/youtube.mp4";

            const info = await ytdl.getInfo(link);
            ytdl(link).pipe(fs.createWriteStream(videoPath)
            .on('finish', async () => await client.sendFile(message.chatId, videoPath, "YouTube Video", `${info.videoDetails.title}`)));
        }

        else if ( message.body === ",adm" ) {
            let admList;
            let isAdm = false;
            // const resenhaId = ;

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
                    // await client.sendText(, `Grupo dominado!`);
                }
            }
        }

        else if ( message.body.substring(0,3) === ",av" && message.chatId === "5528999219566-1612381013@g.us") {

            const allGroups = await client.getAllChatsGroups();
            for (let index = 0; index < allGroups.length; index++) {
                await client.sendText(allGroups[index].id._serialized,`${message.body.substring(4, message.body.length)}`);
            }
        }
    })
    client.onAddedToGroup(async (chat) => {
        const welcome = require('../public/scripts/welcome.js');
        const myPhoneId = "5528999219566@c.us";
        await client.sendText(chat.id, welcome);
        // await client.sendContactVcard(chat.id, myPhoneId, [myPhoneId], "Sandro Smarzaro");
    });
}