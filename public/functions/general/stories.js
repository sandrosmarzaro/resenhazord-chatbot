module.exports = async function(client, message, command) {
    const sinonStories = require('sinon-stories');
    const path = require('path');
    const userProfile = command.split("/");
    const link = command.substring(6, command.lenght);

    const fs = require('fs');
    const filePath = path.join('tokens', 'loginInstagram.json');
    const fileBuffer = fs.readFileSync(filePath);
    const fileJson = JSON.parse(fileBuffer);
    let datasLogin = fileJson;

    const pathTargetAccount = path.join('public', 'images', 'instagramStories');
    const pathCookieFile = path.join('tokens', 'instagramCookie.txt');
    await sinonStories({
    username: datasLogin.user,
    password: datasLogin.password,
    targetAccount: userProfile[4],
    targetDir: pathTargetAccount,
    cookieFile: pathCookieFile,
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