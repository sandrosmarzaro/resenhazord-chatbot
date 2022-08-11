module.exports = async function (client, message) {
    const request = require('request');

    const url = 'https://api.punkapi.com/v2/beers/random';

    request(url, (error, response, body) => {
        if (error) {
            client.sendMessage(
                message.chatId,
                'Error ao tentar obter uma cerveja aleatória.'
            );
            console.log(error);
        } else {
            const beer = JSON.parse(body);
            client.sendImage(
                message.chatId,
                beer[0]['image_url'],
                beer[0]['name'], 
                beer[0]['name'] + "\n\n" + beer[0]['tagline']
            );
        }
    });
}
