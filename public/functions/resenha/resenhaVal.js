module.exports = async function(client, message, command) {
    const valorosos = ["5528999223882", "5528988038529", "5527999236797",
    "5528992570457", "5528999292286", "5528999292778",
    "5528999566204", "5528992981473"];
    
    let contacts = "";
    const text = command.substring(5, command.length);
    valorosos.forEach(element => {
        contacts += "@" + element + " ";
    });
    await client.sendMentioned(await message.chatId, `${text} ${contacts}`, valorosos);
}