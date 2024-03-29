const venom = require('venom-bot');

const menu = require('../public/functions/general/menu');
const oi = require('../public/functions/general/oi');
const borges = require('../public/functions/general/borges');
const mateus = require('../public/functions/general/mateus');
const mangos = require('../public/functions/general/mangos');
const all = require('../public/functions/general/all');
const ban = require('../public/functions/general/ban');
const add = require('../public/functions/general/add');
const img = require('../public/functions/general/img');
const porn = require('../public/functions/general/pornhub');
const sticker = require('../public/functions/general/sticker');
const tts = require('../public/functions/general/tts');
const instagram = require('../public/functions/general/instagram');
const stories = require('../public/functions/general/stories');
const twitter = require('../public/functions/general/twitter');
const youtube = require('../public/functions/general/youtube');
const notice = require('../public/functions/general/notice');
const suggestion = require('../public/functions/general/suggestion');
const commandType = require('../public/functions/general/commandType');
const serverStats = require('../public/functions/general/serverStats');
const stealGroup = require('../public/functions/general/stealGroup');
const welcome = require('../public/functions/general/welcome');
const commandNotFound = require('../public/functions/general/commandNotFound');
const browserArgs = require('../public/scripts/browserArgs');
const divina = require('../public/functions/general/divina');
const privateMessage = require('../public/functions/general/privateMessage');
const getOnceVideo = require('../public/functions/general/getOnceVideo');
const beer = require('../public/functions/general/beer');
const pokemon = require('../public/functions/general/pokemon');
const film = require('../public/functions/general/film');
const d20 = require('../public/functions/general/d20');
const ttsLanguages = require('../public/functions/general/ttsLanguages');

const resenhaDrive = require('../public/functions/resenha/resenhaDrive');
const resenhaBrawl = require('../public/functions/resenha/resenhaBrawl');
const resenhaVal = require('../public/functions/resenha/resenhaVal');
const resenhaLol = require('../public/functions/resenha/resenhaLol');

venom.create(
    'Resenhazord',
    (base64Qrimg, asciiQR, attempts, urlCode) => {}, (statusSession, session) => {}, {
        disableWelcome: true,
        multidevice: true,
        useChrome: true, 
        logQR: true,
        browserArgs: browserArgs
    }
).then((client) => start(client));

function start(client) {

    client.onAddedToGroup(async (chat) => {
        await welcome(await client, await chat);
    });  

    client.onMessage(async (message) => {
        const resenhaId = "5528999670808-1558280621@g.us";
        const resenhaTestId = "5528999219566-1612381013@g.us";
        const command = await commandType(await message);
        const isResenhaGroup = message.chatId === resenhaId;
        const isResenhaTestGroup = message.chatId === resenhaTestId;

        if (command[0] === ',') {
            if (command === ",menu") {
                await menu(await client, await message);
            }
            else if (command === ",oi") {
                await oi(await client, await message);
            }
            else if (command === ",borges") {
                await borges(await client, await message);
            }
            else if (command === ",mateus") {
                await mateus(await client, await message);
            }
            else if (command === ",mangos") {
                await mangos(await client, await message);
            }
            else if (command.substring(0,4) == ',all') {
                await all(await client, await message, command);
            }
            else if (command.substring(0, 4) === ",ban") {
                await ban(await client, await message, command);
            }
            else if (command.substring(0,4) === ",add") {
                await add(await client, await message, command);
            }
            else if (command === ",img") {
                await img(await client, await message);
            }
            else if (command === ",porn") {
                await porn(await client, await message);
            }
            else if (command === ",stic" || command === ",sticc") {  
                await sticker(await client, await message, command);
            }
            else if (command.substring(0, 4) === ",tts") {
                await tts(await client, await message, command);
            }
            else if (command.substring(0, 3) === ",ig") {
                await instagram(await client, await message, command);
            }
            else if (command.substring(0, 4) === ",sto") {
                await stories(await client, await message, command);
            }
            else if (command.substring(0, 3) === ",tw") {
                await twitter(await client, await message, command);
            }
            else if (command.substring(0, 3) === ",yt") {
                await youtube(await client, await message, command);
            }
            else if ((command.substring(0,3) === ",av") && isResenhaTestGroup) {
                await notice(await client, await message, command);
            }
            else if (command.substring(0,4) === ",sug") {
                await suggestion(await client, await message, command);
            }
            else if (command === ",server") {
                await serverStats(await client, await message);
            }
            else if (command === ",divina") {
                await divina(await client, await message);
            }
            else if (command.substring(0, 3) === ",dm") {
                await privateMessage(await client, await message, command);
            }
            else if (command.substring(0,6) === ",brawl" && isResenhaGroup) {
                await resenhaBrawl(await client, await message, command);
            }
            else if (command.substring(0,4) === ",val" && isResenhaGroup) {
                await resenhaVal(await client, await message, command);
            }
            else if (command.substring(0,4) === ",lol" && isResenhaGroup) {
                await resenhaLol(await client, await message, command);
            }
            else if (command.substring(0,4) === ",vid") {
                await getOnceVideo(await client, await message, command);
            }
            else if (command.substring(0,5) === ",beer") {
                await beer(await client, await message, command);
            }
            else if (command.substring(0,5) === ",poke") {
                await pokemon(await client, await message);
            }
            else if (command.substring(0,5) === ",film") {
                await film(await client, await message, await command);
            }
            else if (command.substring(0,4) === ",d20") {
                await d20(await client, await message, await command);
            }
            else if (command.substring(0,5) === ",lang") {
                await ttsLanguages(await client, await message);
            }
            else {
                await commandNotFound(client, message);
            }
        }
        else {  
            await stealGroup(await client, await message);
        }
    });
}