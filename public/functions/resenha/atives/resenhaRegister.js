module.exports = async function (client, message, command) {
    const writeresenhaList = require('../auxiliary/resenhaWriteList');
    let resenhaList = require('../auxiliary/resenhaLoadList');
    const datasCommand = command.split(' ');

    if ( datasCommand[1] === 'zerar' && (message.author === "5528999223882@c.us") ){
        resenhaList.forEach(element => {
            element.coin = 0;
        });
        await client.sendText(await message.chatId, `Todas as carteirinhas foram zeradas!`);
    }
    else if ( datasCommand[1] === 'all' && (message.author === "5528999223882@c.us") ) {
        const allResenhistas = await client.getGroupMembers(await message.chatId);
        allResenhistas.forEach((element, index) => {
            resenhaList.push({
                "id": element.id._serialized,
                "phone": element.id.user,
                "index": index,
                "name": "",
                "coin": 0,
                "occurences": [
                    {
                        "day": 0,
                        "occurence": 0
                    },
                    {
                        "day": 0,
                        "occurence": 0
                    },
                    {
                        "day": 0,
                        "occurence": 0
                    }
                ]
            });
        });
        await client.sendText(await message.chatId, `As carterinhas de todo mundo foi criada!`);
    }
    else if ((datasCommand[1][0] === '@') && (message.author === "5528999223882@c.us") ){
        const phoneAt = datasCommand[1].split('@');
        const id = phoneAt[1] + '@c.us';
        const name = datasCommand[2];
        resenhaList.push({
            "id": id,
            "phone": phoneAt[1],
            "index": -1, 
            "name": name,
            "coin": 0,
            "occurences": [
                {
                    "day": 0,
                    "occurence": 0
                },
                {
                    "day": 0,
                    "occurence": 0
                },
                {
                    "day": 0,
                    "occurence": 0
                }
            ]
        });
        await client.sendText(await message.chatId,
        `Carteirinha do resenhista ${name} enfiada no cu com sucesso!`);
    }
    writeresenhaList(resenhaList);
}