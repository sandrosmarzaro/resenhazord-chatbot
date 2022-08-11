module.exports = async function (client, message) {
    const request = require('request');

    const randomNumber = Math.floor(Math.random() * 890) + 1;
    const url = 'https://pokeapi.co/api/v2/pokemon/'+ randomNumber;

    request(url, (error, response, body) => {
        if (error) {
            client.sendMessage(
                message.chatId,
                'Error ao tentar obter um Pokémon aleatório.'
            );
            console.log(error);
        } else {
            const pokemon = JSON.parse(body);
            client.sendImage(
                message.chatId,
                pokemon['sprites']['other']['official-artwork']['front_default'],
                pokemon['name'], 
                pokemon['name']
            );
        }
    });
}