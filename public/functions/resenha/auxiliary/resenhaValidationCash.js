module.exports = function(client, message, cash, phone) {
    let validation = false;
    let invalidFormat = false;

    for (let index = 0; index < cash.lenght; index++) {
        if (cash[index] === ',' ) {
            invalidFormat = true;
        }
    }

    if ( !invalidFormat ){
        if ( cash >= 0 ) { 
            const intCash = parseInt(cash);
            const flaotCash = cash - intCash;

            if ( flaotCash >= 0.01 || flaotCash === 0) {
                validation = true;
            }
            else {
                await client.sendMentioned(await message.chatId,
                `Você deve ter valores decimais acima de R₡ 0.01 @${phone}`,
                [phone]);
            }
        }
        else {
            await client.sendMentioned(await message.chatId,
            `Você não deve inserir valores negativos ou nulos @${phone}`,
            [phone]);
        }
    }
    else {
        await client.sendMentioned(await message.chatId,
        `Formato do coin inválido @${phone}`,
        [phone]);
    }
    return validation;
}