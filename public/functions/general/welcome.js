module.exports = async function (client, chat) {
    const path = require('path');
    const filePath = path.join('..', '..', 'scripts', 'welcomeString.js');
    await client.sendText(await chat.id, welcome).catch(async (err) => {
        console.log(`Welcome error\n`);
        err.forEach(element => {
            console.log(`${element}`);
        });
    });
}