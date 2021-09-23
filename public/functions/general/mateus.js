module.exports = async function(client, message) {
    const swearingString = require('../../scripts/swearingString');
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