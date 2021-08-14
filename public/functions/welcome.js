module.exports = async function (client, chat) {
    const welcome = require('../scripts/welcome');
    await client.sendText(await chat.id, welcome).catch(async (err) => {
        console.log(`Welcome error\n`);
        err.forEach(element => {
            console.log(`${element}`);
        });
    });
}