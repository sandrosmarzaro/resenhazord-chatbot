const { url } = require('inspector');
const venom = require('venom-bot');

venom.create(
    'Resenhazord',
    (base64Qrimg, asciiQR, attempts, urlCode) => {}, (statusSession, session) => {}, {useChrome: true,}
).then((client) => start(client));

function start (client) {

    client.onAddedToGroup(async (chat) => {
        const welcome = require('../public/scripts/welcome.js');
        await client.sendText(await chat.id, welcome).catch(async (err) => {
            console.log(`sendText\n${err}`);
        });    
    }).catch(async (err) => {
        console.log(`OnAdded\n${err}`);
    });  

    client.onMessage(async (message) => {
        let command;
        if ( message.type === 'image' || message.type === 'video' ) {
            message.caption != undefined ? command = await message.caption : command = "0";
        }
        else if ( message.type === 'chat' ) {
            message.caption == undefined ? command = await message.body : command = "0";
        }
        else {
            command = "0";
        }
        
        if ( command[0] === ',' ) {
            if ( command === ",menu" ) {
                const menu = require('../public/scripts/menuString');
                await client.sendText(message.chatId, menu);
            }
    
            else if ( command === ",oi" ){
                let numberRequest;
    
                numberRequest = String(message.sender.id).split('@');
                await client.sendMentioned (message.chatId, `Vai se fuder @${numberRequest[0]} filha da puta!`, [numberRequest[0]]);
            }
            
            else if ( command === ",borges" ){
                const fs = require('fs');
                const filePath = 'public/data/borges.json';
    
                const fileBuffer = fs.readFileSync(filePath, 'utf-8');
                const fileJson = JSON.parse(fileBuffer);
                let borges = fileJson;
    
                borges.nargas++;
                await client.sendText(message.chatId, `O Borges já fumou ${borges.nargas} nargas`);
    
                const fileString = JSON.stringify(borges);
                fs.writeFileSync(filePath, fileString);
            }
    
            else if ( command === ",mateus" ){
                const swearingString = require('../public/scripts/swearingString.js');
                let swearingArray = swearingString.split(",");
                const maxSwearing = swearingArray.length;
                const randomIndex = Number.parseInt(Math.random() * maxSwearing);
    
                let m = swearingArray.length, t, i;
                // While there remain elements to shuffle…
                while (m) {
                    // Pick a remaining element…
                    i = Math.floor(Math.random() * m--);
                    // And swap it with the current element.
                    t = swearingArray[m];
                    swearingArray[m] = swearingArray[i];
                    swearingArray[i] = t;
                }
    
                await client.sendText(message.chatId, `Mateus vocé é${swearingArray[randomIndex]}`);
            }
                
            else if ( command === ",mangos" ){
                let numberRandom;
                const maxNumber = 100;
    
                numberRandom = Math.random() * maxNumber;
                numberRandom = numberRandom.toFixed(2);
                numberRandom = numberRandom.replace('.', ',');
                await client.sendText(message.chatId, `A chance de Mangos II nascer agora é ${numberRandom} %`);
            }
            
            else if ( command.substring(0,4) == ',all' ) {
                
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
                    await client.sendMentioned(message.chatId, `${command.substring(5, command.length)} ${contacts}`, users);
                }
                else {
                    await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo marcar ninguém!`);
                }
            }
    
            else if ( command === ",ban" ){
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
                        if ( admArray[index].user == "552899223882" ) {
                            isAdm = true;
                        }
                    }
                    if ( isAdm ) {
                        if ( membersArray[randomIndexMember].id.user === "552899223882" ) {
                            await client.sendText(message.chatId, `Ops! Tentei me banir...`);
                        }
                        else{
                            await client.removeParticipant(message.chatId, membersArray[randomIndexMember].id._serialized);
                        }  
                    }
                    else{
                        await client.sendMentioned(message.chatId, 
                            `Como não tenho administrador sugiro banir o(a) @
                            ${membersArray[randomIndexMember].id.user}`, [membersArray[randomIndexMember].id.user]);
                    }
                }
                else{
                    await client.sendText(message.chatId, `Aqui é uma conversa privada, não consigo banir ninguém!`);
                }
            }
            
            else if ( command.substring(0,4) === ",add" ) {
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
            
            else if ( command === ",img" ){
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
    
            // else if ( command === ",porn" ) {
            //     const pornhub = require('@justalk/pornhub-api');
            //     const url = 'https://pt.pornhub.com/random';
            //     let video;
            //     do{
            //         video = await pornhub.page(url, ['title','pornstars','download_urls']);
                    
            //     } while (video[1]['error'] === 'An error occured')
    
            //     console.log(video);
            // }
            
            else if ( command === ",stic" || command === ",sticrop" ){ 
                const fs = require('fs');
                const mime = require('mime-types');
                const WSF = require('wa-sticker-formatter');
                
                let bufferMessage;
                let mimetypeMessage;
                if ( message.type === "chat" ) {
                    bufferMessage = message.quotedMsg;
                    mimetypeMessage = message.quotedMsg.mimetype;
                }
                else {
                    bufferMessage = message;
                    mimetypeMessage = message.mimetype;
                }
                const buffer = await client.decryptFile(bufferMessage);
                const fileName = `public/images/sticker.${mime.extension(mimetypeMessage)}`;
                fs.writeFile(fileName, buffer, async (err) => {
                    
                    const typeMedia = await mimetypeMessage.split('/');
                    const image = fs.readFileSync('./' + fileName);
                    let sticker;
    
                    if ( typeMedia[0] === "video" ) {
                        
                        command === ",sticrop" ? 
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
    
                        command === ",sticrop" ? 
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
            else if ( command.substring(0, 4) === ",tts") {
                const googleTTS = require('google-tts-api');
                if ( command.substring(0, 4) === ",tts" ) {
                    const language = command.substring(5, 10);
                    const text = command.substring(11, command.length);
                    const audioUrl = googleTTS.getAudioUrl(text, {
                        lang: language,
                        slow: false,
                        host: 'https://translate.google.com',
                    });
                    await client.sendVoice(message.chatId, audioUrl);
                }
            }
            
            else if ( command.substring(0, 3) === ",ig" ) {
                const instagramGetUrl = require("instagram-url-direct");
                let links = await instagramGetUrl(command.substring(4, command.length));
                await client.sendFile(message.chatId, links['url_list'][0], `Instagram Video`, 'Aqui está seu vídeo do Instagram!');
            }
            
            else if ( command.substring(0, 3) === ",tw" ) {
                const videoUrlLink = require('video-url-link');
                const link = command.substring(5, command.length);
    
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
    
            else if ( command.substring(0, 3) === ",yt" ) {
                const ytdl = require('ytdl-core');
                const fs = require('fs');
                const link = command.substring(4, command.length);
                const videoPath = "public/images/youtube.mp4";
    
                const info = await ytdl.getInfo(link);
                ytdl(link).pipe(
                    fs.createWriteStream(videoPath)
                        .on('finish', async () => {
                            console.log(info);
                            await client.sendFile(message.chatId, videoPath, "YouTube Video", `${info.videoDetails.title}`)}
                    ));
            }
    
            else if ( command.substring(0,3) === ",av" && message.chatId === "5528999219566-1612381013@g.us") {
                const allGroups = await client.getAllChatsGroups();
                for (let index = 0; index < allGroups.length; index++) {
                    await client.sendText(allGroups[index].id._serialized,`${command.substring(4, command.length)}`);
                }
            }
    
            else if ( command.substring(0,4) === ",sug" ) {
                let sugestion;
                const fs = require('fs');
                const filePath = "public/data/sugestion.json";
                
                const jsonString = fs.readFileSync(filePath, 'utf-8');
                const fileJson = JSON.parse(jsonString)
    
                sugestion = command.substring(6, command.length);
    
                // fs.writeFile(path, ,(err) => {console.error});
                
            }
            else if ( command.substring(0, 6) === ",drive") {
                const Google = require('google-api-wrapper');
                const Drive = Google.getDrive();
                if ( message.type === 'chat' ) {
                }
                else {
                    const file = await Drive.create('name', message.mimetype, message.body, '1vDkwn6Y6xRAyKi8F7AwG14JWSWEIQSKM');
                }
            }
        }

        else {
            if ( message.isGroupMsg ) {
                let admList;
                let isAdm = false;
                let haveOwnerAdm = false;
                const userBot = "552899223882";
                const nameGroup = await message.chat.name;
                const resenhaId = "5528999292286-1623423919@g.us";
                const ownerAdm = await message.chat.groupMetadata.owner;

                admList = await client.getGroupAdmins ( message.chatId );
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
                    if ( !haveOwnerAdm ) {
                        for (let index = 0; index < admList.length; index++) {
                            if ( admList[index].user != userBot ) {
                                await client.demoteParticipant(message.chatId, (admList[index].user + "@c.us"));
                            }
                        }
                        const linkGroup = await client.getGroupInviteLink(message.chatId);
                        await client.sendLinkPreview(resenhaId, linkGroup,`\nGrupo dominado!\n`, `*_${nameGroup}_*`);
                    }
                }
            }
        }
    });
}