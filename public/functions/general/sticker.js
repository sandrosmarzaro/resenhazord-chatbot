module.exports = async function (client, message, command){
    const { Sticker, StickerTypes } = require('wa-sticker-formatter');
    let bufferMessage;
    if (await message.type === "chat") {
        bufferMessage = await message.quotedMsgObj;
        mimetypeMessage = await message.quotedMsgObj.mimetype;
    }
    else {
        bufferMessage = await message;
        mimetypeMessage = await message.mimetype;
    }
    const bufferMedia = await client.decryptFile(bufferMessage);
    const typeMedia = mimetypeMessage.split('/');
    let isStickerAnimeted = false;
    if (typeMedia[0] === "video") isStickerAnimeted = true;

    let typeSticker;
    let backgroundColor = '';
    if (command === ',stic') {
        typeSticker = StickerTypes.FULL;
        backgroundColor = {
            "r": 255,
            "g": 255,
            "b": 255,
            "alpha": 0
        }
    }
    else if (command === ',sticc') typeSticker = StickerTypes.CROPPED;
    const sticker = new Sticker(bufferMedia, {
        pack: 'Resenha Pack',
        author: 'Resenhazord',
        type: typeSticker,
        categories: [],
        id: '',
        quality: 100,
        background: backgroundColor
    })

    const path = require('path');
    if (isStickerAnimeted) {
        const fs = require('fs');
        const filePath = path.join('public', 'images', 'sticker.gif');
        const bufferSticker = await sticker.toBuffer();
        fs.writeFile(filePath, bufferSticker, async (err) => {
            await client.sendImageAsStickerGif(await message.chatId, filePath);
        });
    }    
    else {
        const filePath = path.join('public', 'images', 'sticker.webp');
        await sticker.toFile(filePath);
        await client.sendImageAsSticker(await message.chatId, filePath);
    }
    
}