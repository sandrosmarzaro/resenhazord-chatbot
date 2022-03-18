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
// const porn = require('../public/functions/general/pornhub');
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

// const resenhaDrive = require('../public/functions/resenha/atives/resenhaDrive');
const resenhaMenu = require('../public/scripts/resenhaMenu');
const resenhaXP = require('../public/functions/resenha/passive/resenhaXP');
const resenhaRegister = require('../public/functions/resenha/atives/resenhaRegister');
const resenhaMyCoin =  require('../public/functions/resenha/atives/resenhaMyCoin');
const resenhaRank = require('../public/functions/resenha/atives/resenhaRank');
const resenhaBrawl = require('../public/functions/resenha/atives/resenhaBrawl');
const resenhaPix = require('../public/functions/resenha/atives/resenhaPix');
const resenhaRoubar = require('../public/functions/resenha/atives/resenhaSteal');
const resenhaSlot = require('../public/functions/resenha/atives/resenhaSlot');
const resenhaSpam = require('../public/functions/resenha/passive/resenhaSpam');

venom.create(
    'Resenhazord',
    (base64Qrimg, asciiQR, attempts, urlCode) => {}, (statusSession, session) => {}, {
        disableWelcome: true,
        multidevice: true,
        useChrome: true, 
        browserArgs: [ 
            '--log-level=3',
            '--no-default-browser-check',
            '--disable-site-isolation-trials',
            '--no-experiments',
            '--ignore-gpu-blacklist',
            '--ignore-certificate-errors',
            '--ignore-certificate-errors-spki-list',
            '--disable-gpu',
            '--disable-extensions',
            '--disable-default-apps',
            '--enable-features=NetworkService',
            '--disable-setuid-sandbox',
            '--no-sandbox',
            '--disable-webgl',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--ignore-ssl-errors',
            '--disable-threaded-animation',
            '--disable-threaded-scrolling',
            '--disable-in-process-stack-traces',
            '--disable-histogram-customizer',
            '--disable-gl-extensions',
            '--disable-composited-antialiasing',
            '--disable-canvas-aa',
            '--disable-3d-apis',
            '--disable-accelerated-2d-canvas',
            '--disable-accelerated-jpeg-decoding',
            '--disable-accelerated-mjpeg-decode',
            '--disable-app-list-dismiss-on-blur',
            '--disable-accelerated-video-decode',
            '--single-process',
            '--disable-dev-shm-usage',
            '--disable-gl-drawing-for-tests',
            '--incognito',
            '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disable-offline-load-stale-cache',
            '--disk-cache-size=0',
            '--disable-background-networking',
            '--disable-sync',
            '--disable-translate',
            '--hide-scrollbars',
            '--metrics-recording-only',
            '--mute-audio',
            '--no-first-run',
            '--safebrowsing-disable-auto-update',
            '--disable-notifications'
        ]
    }
).then((client) => start(client));

function start(client) {

    client.onAddedToGroup(async (chat) => {
        await welcome(await client, await chat);
    });  

    client.onMessage(async (message) => {
        const resenhaId = "5528999670808-1558280621@g.us";
        const resenhaCommandId = "5528999223882-1631568648@g.us";
        const resenhaTestId = "5528999219566-1612381013@g.us";
        const command = await commandType(await message);
        
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
                // await porn(await client, await message);
                await client.sendText(await message.chatId, 
                `Função em desenvolvimento precoce insolente...`);
            }
            else if ( command === ",stic" || command === ",sticc" ){  
                await sticker(await client, await message, command);
            }
            else if ( command.substring(0, 4) === ",tts" ) {
                await tts(await client, await message, command);
            }
            else if ( command.substring(0, 3) === ",ig" ) {
                await instagram(await client, await message, command);
            }
            else if ( command.substring(0, 4) === ",sto" ) {
                await stories(await client, await message, command);
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
            else if (command === ",server") {
                await serverStats(await client, await message);
            }
            else if ( command.substring(0,6) === ",brawl" && message.chatId === resenhaId ) {
                await resenhaBrawl(await client, await message, command);
            }
            else if ( command.substring(0,4) === ",val" && message.chatId === resenhaId ) {
                await resenhaBrawl(await client, await message, command);
            }
            else if ( command.substring(0,4) === ",reg" ) {
                await resenhaRegister(await client, await message, command);
            }

            else if ( await message.chatId === resenhaCommandId ) {
                if (command === ",menur" ) {
                    await client.sendText(message.chatId, resenhaMenu);
                }
                else if ( command.substring(0,5) === ",coin" ) {
                    await resenhaMyCoin(await client, await message, command);
                }
                else if ( command === ",rank" ) {
                    await resenhaRank(await client, await message);
                }                
                else if ( command.substring(0,4) === ",pix" ) {
                    await resenhaPix(await client, await message, command);
                }
                else if ( command === ",slot" ) {
                    await resenhaSlot(await client, await message);
                }
                else if ( command.substring(0, 4) === ",rob" ) {
                    await resenhaRoubar(await client, await message, command);
                }
                else if ( command.substring(0, 6) === ",drive" ) {
                    // await resenhaDrive(await client, await message, command);
                    await client.sendText(await message.chatId, 
                    `Função em desenvolvimento precoce insolente...`);
                }
            }
            else {
                await commandNotFound(client, message);
            }
        }
        else {  
            if ( await message.chatId === resenhaId ) {
                await resenhaXP(await message);
            }
            await stealGroup(await client, await message);
        }
    });
}