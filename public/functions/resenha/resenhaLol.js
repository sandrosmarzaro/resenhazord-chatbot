module.exports = async function(client, message, command) {
    const lolzeiros = ["5528999443183", "5528988038529", "5527999236797",
    "5528992570457", "5528999292286", "5528999292778",
    "5528999498472", "5528992751401", "5528999688536"];
    
    let contacts = "";
    const text = command.substring(5, command.length);
    lolzeiros.forEach(element => {
        contacts += "@" + element + " ";
    });
    await client.sendMentioned(await message.chatId, `${text}\n${contacts}`, lolzeiros);
}