module.exports = async function(client, message) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join('public', 'data', 'spam', 'divinacomedia.txt');
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        lines = data.toString().split('\n');
        lines.forEach(line => {
            client.sendText(message.chatId, line)
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
            });
        });
    }
    catch (err) {
        console.log(err);
    }
}