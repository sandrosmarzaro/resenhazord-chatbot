module.exports = async function(client, message) {
    const os = require('os');

    function convertByte2MegaByte(number) {
        return (number / 1024) / 1024 ;
    }

    const totalmem = convertByte2MegaByte(os.totalmem()).toFixed(2);
    const freemem = convertByte2MegaByte(os.freemem()).toFixed(2);
    const usedmem = totalmem - freemem;
    const usagePercent = (freemem / totalmem) * 100;
    
    await client.sendText(
        await message.chatId, 
        "\t🗄 *RESENHAZORD SERVER* 🗄\n\n" +
        "🖥 *OS*: " + os.platform() + " " + os.release() +  "\n\n" +
        "⚙️ *CPU*: " + os.cpus()[0].model + " " + os.endianness() + " " + os.arch() + "\n\n" +
        "💾 *RAM*: " +  totalmem + " MB (" + usedmem + " MB usado)" + " " + 
            usagePercent.toFixed(2) + "%\n\n" +
        "⏱ *TIME*: " + (os.uptime() / 3600).toFixed(2) + "h"
    );
}