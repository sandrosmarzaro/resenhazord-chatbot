module.exports = async function (client, message, command){
    const fs = require('fs');
    const mime = require('mime-types');
    const WSF = require('wa-sticker-formatter');
    
    let bufferMessage;
    let mimetypeMessage;
    if ( message.type === "chat" ) {
        bufferMessage = message.quotedMsg;
        mimetypeMessage = message.quotedMsg.mimetype;
    }
    else {
        bufferMessage = message;
        mimetypeMessage = message.mimetype;
    }
    const buffer = await client.decryptFile(bufferMessage);
    const fileName = `public/images/sticker.${mime.extension(mimetypeMessage)}`;
    fs.writeFile(fileName, buffer, async (err) => {
        
        const typeMedia = await mimetypeMessage.split('/');
        const image = fs.readFileSync('./' + fileName);
        let sticker;

        if ( typeMedia[0] === "video" ) {
            
            command === ",sticrop" ? 
            stickerGif = new WSF.Sticker(image, { 
                crop: true, 
                animated: true, 
                pack: 'Resenha Pack', 
                author: 'REZENHAZORD' 
            }) 
            : stickerGif = new WSF.Sticker(image, { 
                crop: false,  
                animated: true, 
                pack: 'Resenha Pack', 
                author: 'REZENHAZORD' });

            await stickerGif.build();
            const sticGifBuffer = await stickerGif.get();
            const pathGifSticker = "public/images/sticker.gif";

            fs.writeFile(pathGifSticker, sticGifBuffer, async (err) =>{
                await client.sendImageAsStickerGif(message.chatId, pathGifSticker);
            });
        }

        else if ( typeMedia[0] === "image" ) {

            command === ",sticrop" ? 
            sticker = new WSF.Sticker(image, { 
                crop: true, 
                animated: false, 
                pack: 'Resenha Pack', 
                author: 'REZENHAZORD' }) 
            : sticker = new WSF.Sticker(image, { 
                crop: false,  
                animated: false, 
                pack: 'Resenha Pack', 
                author: 'REZENHAZORD' });

            await sticker.build();
            const sticBuffer = await sticker.get();
            const pathSticker = "public/images/sticker.webp";

            fs.writeFile(pathSticker, sticBuffer, async (err) =>{
                await client.sendImageAsSticker(message.chatId, pathSticker);
            });
        }                
    });
}