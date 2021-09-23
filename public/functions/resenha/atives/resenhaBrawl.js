module.exports = async function(client, message, command) {
    const brawlsenhistas = ["5528999223882", "5528988038529", "5528999443183",
    "5528999210796", "5528999292286", "5512981672239",
    "5528999969123", "5528999670808"];
    
    let contacts = "";
    const text = command.substring(7, command.length);
    brawlsenhistas.forEach(element => {
        contacts += "@" + element + " ";
    });
    await client.sendMentioned(await message.chatId, `${text} ${contacts}`, brawlsenhistas);
}