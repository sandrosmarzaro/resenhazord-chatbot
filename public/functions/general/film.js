module.exports = async function(client, message, command) {
    const request = require('request');
    const dotenv = require('dotenv').config();
    const key = process.env.IMDB_KEY;
    
    try {
        command = command.substring(6, command.length);
    }
    catch (e) {
        client.sendText(
            message.chatId,
            'Error ao obter o comando.'
        );
        return;
    }
    let url;
    let random;

    if (command == null || command === "") {
        random = Math.floor(Math.random() * 100);
        random > 50 ? command = 'pop' : command = 'top';
    }

    if (command === "top") {
        url = "https://imdb-api.com/en/API/Top250Movies/" + key;
        random = Math.floor(Math.random() * 250);
    }
    else if (command === "pop") {
        url = "https://imdb-api.com/en/API/MostPopularMovies/" + key;
        random = Math.floor(Math.random() * 100);
    }
    else {
        client.sendText(
            message.chatId,
            'Opção inválida!\nDisponíveis opções: top, pop'
        );
        return;
    }

    request(url, (error, response, body) => {
        if (error) {
            client.sendText(
                message.chatId,
                'Error ao tentar obter um filme aleatório.'
            );
            console.log(error);
            return;
        } else {
            try {
                const films = JSON.parse(body);
                const film = films.items[random];
                const id = film.id;
                const title = film.fullTitle;
                const rank = film.rank;
                const imDbRating = film.imDbRating;

                const imageUrl = "https://imdb-api.com/en/API/Posters/"+ key + "/" + id;

                request(imageUrl, (error, response, body) => {
                    if (error) {
                        client.sendText(
                            message.chatId,
                            'Error ao tentar obter uma imagem do filme.'
                        );
                        console.log(error);
                        return;
                    } else {
                        const image = JSON.parse(body);
                        client.sendImage(
                            message.chatId,
                            image.posters[0].link,
                            title,
                            title + "\n\n" + "Rank: " + rank + "º\n" + "Rating: " + imDbRating
                        );
                    }
                });
            }
            catch (e) {
                client.sendText(
                    message.chatId,
                    'Error ao tentar obter um filme aleatório.'
                );
            }
        }
    });
}