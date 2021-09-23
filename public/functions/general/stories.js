module.exports = async function(client, message, command) {
    const sinonStories = require('sinon-stories');
    const userProfile = command.split("/");
    const link = command.substring(6, command.lenght);

    const fs = require('fs');
    const filePath = 'tokens/loginInstagram.json';
    const fileBuffer = fs.readFileSync(filePath);
    const fileJson = JSON.parse(fileBuffer);
    let datasLogin = fileJson;

    await sinonStories({
    username: datasLogin.user,
    password: datasLogin.password,
    targetAccount: userProfile[4],
    targetDir: 'public/images/instagramStories/',
    cookieFile: 'tokens/instagramCookie.txt',
    print: true,
    only_video: false,
    verbose: true
    }).then(async (storyURLS) => {
        console.log(storyURLS);
        // for (let index = 0; index < storyURLS.lenght; index++) {
        //     if ( storyURLS[index] === link) {

        //     }
        // }
    });
    

}