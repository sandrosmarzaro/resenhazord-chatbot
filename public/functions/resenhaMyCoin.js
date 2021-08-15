module.exports = async function(client, message) {
    const resenhista = await message.author;
    const fs = require('fs');
    const filePath = 'public/data/resenha.json';
    const fileBuffer = fs.readFileSync(filePath);
    const fileJson = JSON.parse(fileBuffer);
    let register = fileJson;
    let resenhistaExists = false;
    let coin;

    register.forEach(element => {
        if ( element.phone === resenhista ) {
            resenhistaExists = true;
            coin = element.coin;
        }
    });
    const resenhistaWithouId = resenhista.split('@');
    if ( resenhistaExists ) {
        await client.sendMentioned(await message.chatId, 
            `Seu coin é R₡ ${coin} @${resenhistaWithouId[0]}`,
            [resenhistaWithouId[0]]);
    }
    else {
        await client.sendMentioned(await message.chatId,
            `Você não tem sua carteirinha de resenhista ainda @${resenhistaWithouId[0]}`,
            [resenhistaWithouId[0]]);
    }
}