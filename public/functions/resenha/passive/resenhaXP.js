module.exports = async function (message) {
    const writeList = require('../auxiliary/resenhaWriteList');
    let resenhaList = require('../auxiliary/resenhaLoadList');
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
    resenhaList.forEach((element) => {
        if ( element.id === (message.author) ) {
            element.coin += value;
        }
    });
    writeList(resenhaList);
}