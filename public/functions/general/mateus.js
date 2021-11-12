module.exports = async function(client, message) {
    const path = require('path');
    const filePath = path.join('..', '..', 'scripts', 'swearingString.js');
    const swearingString = require(filePath);
    let swearingArray = swearingString.split(",");
    const maxSwearing = swearingArray.length;
    const randomIndex = Number.parseInt(Math.random() * maxSwearing);

    let m = swearingArray.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = swearingArray[m];
        swearingArray[m] = swearingArray[i];
        swearingArray[i] = t;
    }
    const swearing = swearingArray[randomIndex];
    await client.sendText(message.chatId, `Mateus vocé é${swearing}`);
}