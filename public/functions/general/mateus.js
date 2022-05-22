module.exports = async function(client, message) {
    const path = require('path');
    const fs = require('fs');
    const filePathString = path.join('..', '..', 'scripts', 'swearingString.js');
    const filePathCount = path.join('public', 'data', 'general', 'swearing.json');

    const swearingString = require(filePathString);
    let swearingArray = swearingString.split(",");
    const maxSwearing = swearingArray.length;

    const fileBuffer = fs.readFileSync(filePathCount, 'utf-8');
    const fileJson = JSON.parse(fileBuffer);
    let swearingCount = fileJson;
    
    index = swearingCount.index;
    swearingCount.index >= maxSwearing ? swearingCount.index = 0 : swearingCount.index++;
    
    const fileString = JSON.stringify(swearingCount);
    fs.writeFileSync(filePathCount, fileString);

    const swearing = swearingArray[index];
    await client.sendText(message.chatId, `Mateus você é${swearing}`);
}