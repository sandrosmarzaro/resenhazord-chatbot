module.exports = async function (client, message, command) {
    const Google = require('google-api-wrapper');
    const Drive = Google.getDrive();
    if ( message.type === 'chat' ) {
    }
    else {
        const file = await Drive.create('name', message.mimetype, message.body, '1vDkwn6Y6xRAyKi8F7AwG14JWSWEIQSKM');
    }
}