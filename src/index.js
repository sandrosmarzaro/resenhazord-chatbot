const venom = require('venom-bot');
const menu = require('../public/functions/menu');
const oi = require('../public/functions/oi');
const borges = require('../public/functions/borges');
const mateus = require('../public/functions/mateus');
const mangos = require('../public/functions/mangos');
const all = require('../public/functions/all');
const ban = require('../public/functions/ban');
const add = require('../public/functions/add');
const img = require('../public/functions/img');
const porn = require('../public/functions/pornhub');
const sticker = require('../public/functions/sticker');
const tts = require('../public/functions/tts');
const instagram = require('../public/functions/instagram');
const twitter = require('../public/functions/twitter');
const youtube = require('../public/functions/youtube');
const notice = require('../public/functions/notice');
const suggestion = require('../public/functions/suggestion');
const drive = require('../public/functions/drive');
const commandType = require('../public/functions/commandType');
const stealGroup = require('../public/functions/stealGroup');
const welcome = require('../public/functions/welcome');
const resenhaXP = require('../public/functions/resenhaXP');
const resenhaRegister = require('../public/functions/resenhaRegister');
const resenhaMyCoin =  require('../public/functions/resenhaMyCoin');
const resenhaRank = require('../public/functions/resenhaRank');

venom.create(
    'Resenhazord',
    (base64Qrimg, asciiQR, attempts, urlCode) => {}, (statusSession, session) => {}, {useChrome: true,}
).then((client) => start(client));

function start (client) {

    client.onAddedToGroup(async (chat) => {
        await welcome(await client, await chat);
    }).catch(async (err) => {
        console.log(`OnAdded\n${err}`);
    });  

    client.onMessage(async (message) => {
        const resenhaId = "5528999670808-1558280621@g.us";
        const resenhaTestId = "5528999219566-1612381013@g.us";
        let command = await commandType(message);
        
        if ( command[0] === ',' ) {
            if ( command === ",menu" ) {
                await menu(await client, await message);
            }
    
            else if ( command === ",oi" ){
                await oi(await client, await message);
            }
            
            else if ( command === ",borges" ){
                await borges(await client, await message);
            }
    
            else if ( command === ",mateus" ){
                await mateus(await client, await message);
            }
                
            else if ( command === ",mangos" ){
                await mangos(await client, await message);
            }
            
            else if ( command.substring(0,4) == ',all' ) {
                await all(await client, await message, command);
            }
            
            else if ( command.substring(0, 4) === ",ban" ){
                await ban(await client, await message, command);
            }
            
            else if ( command.substring(0,4) === ",add" ) {
                await add(await client, await message, command);
            }
            
            else if ( command === ",img" ){
                await img(await client, await message);
            }
    
            else if ( command === ",porn" ) {
                await porn(await client, await message);
            }
            
            else if ( command === ",stic" || command === ",sticrop" ){  
                await sticker(await client, await message, command);
            }

            else if ( command.substring(0, 4) === ",tts" ) {
                await tts(await client, await message, command);
            }
            
            else if ( command.substring(0, 3) === ",ig" ) {
                await instagram(await client, await message, command);
            }
            
            else if ( command.substring(0, 3) === ",tw" ) {
                await twitter(await client, await message, command);
            }
    
            else if ( command.substring(0, 3) === ",yt" ) {
                await youtube(await client, await message, command);
            }
            
            else if ( (command.substring(0,3) === ",av") && (message.chatId === resenhaTestId) ) {
                await notice(await client, await message, command);
            }
    
            else if ( command.substring(0,4) === ",sug" ) {
                await suggestion(await client, await message, command);
            }

            else if ( command.substring(0, 6) === ",drive") {
                await drive(await client, await message, command);
            }
            else if ( await message.chatId === resenhaId ) {
                if ( command.substring(0,4) === ",reg" ) {
                    await resenhaRegister(await client, await message, command);
                }
                else if ( command === ",coin") {
                    await resenhaMyCoin(await client, await message);
                }
                else if( command === ",rank") {
                    await resenhaRank(await client, await message);
                }
            }
        }

        else {
            await stealGroup(await client, await message);
            if ( await message.chatId === resenhaId ) {
                await resenhaXP(await message);
            }
        }
    });
}