module.exports = async function (message) {
    let command;
    if ( await message.type === 'image' || await message.type === 'video' ) {
        await message.caption != undefined ? command = await message.caption : command = "0";
    }
    else if ( await message.type === 'chat' ) {
        await message.caption == undefined ? command = await message.body : command = "0";
    }
    else {
        command = "0";
    }
    return command;
}