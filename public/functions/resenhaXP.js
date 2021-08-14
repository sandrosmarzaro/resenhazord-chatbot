module.exports = async function (message) {
    const fs = require('fs');
    const filePath = 'public/data/resenha.json';
    const fileBuffer = fs.readFileSync(filePath);
    const fileJson = JSON.parse(fileBuffer);
    let register = fileJson;
    let value = 0;

    if ( await message.type === "chat" ) {
        value = 1;
    }
    else if ( await message.type === "image" ) {
        value = 1.5;
    }
    else if ( await message.type === "sticker" ) {
        value = 1.25;
    }
    else if ( await message.type === "video" ) {
        value = 1.75;
    }
    else if ( await message.type === "ppt" ) {
        value = 1.5;
    }
    else if ( await message.type === "audio" ) {
        value = 1.25;
    }
    else if ( await message.type === "vcard" ) {
        value = 1.75;
    }
    else if ( await message.type === "location" ) {
        value = 2;
    }
    else if ( await message.type === "document" ) {
        value = 1.5;
    }
    register.forEach((element) => {
        if ( element.phone === (message.author) ) {
            element.coin += value;
        }
    });
    const fileString = JSON.stringify(register, null, '\t');
    fs.writeFileSync(filePath, fileString, 'utf-8');
}