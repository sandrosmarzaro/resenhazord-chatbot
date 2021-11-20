module.exports = async function (client, chat) {
    const path = require('path');
    const filePath = path.join('..', '..', 'scripts', 'welcomeString.js');
    const welcomeString = require(filePath);
    await client
        .sendText(await chat.id, welcomeString)
        .catch(async (err) => {
            console.log(`Welcome error\n`);
            console.log(err);
        });
}