module.exports = async function(client, message, command) {
    const datasCommand = command.split(' ');        
    let value = datasCommand[1];                  // Valor digitado na mensagem

    const receiverPhone = datasCommand[2];          // Número do destinatário com @
    let receiverPhoneWhitout = receiverPhone.split('@');
    receiverPhoneWhitout = receiverPhoneWhitout[1]; // Número do destinatário sem @
    let reciverId = receiverPhone.split('@');
    reciverId = reciverId[1] + '@c.us';             // Id do destinatário
    let reciverName;

    const giverId = await message.author;           // Id do doador
    let datasGiver = giverId.split('@');
    const giverPhone = datasGiver[0];               // Número do doador sem @
    let giverName;

    const resenhaList = require('../auxiliary/resenhaLoadList.js');
    resenhaList.forEach(element => {
        if ( element.id === giverId ) {
            giverName = element.name;
        }
        else if ( element.id === reciverId ) {
            reciverName = element.name
        }
    });

    const validationOccurrence = require('../auxiliary/resenhaOccurrence');
    const occurence = await validationOccurrence(await message.author, 0);
    if ( occurence ) {
        const numberExists = require('../auxiliary/resenhaNumberExists');
        const receiverexists = await numberExists(reciverId); // Boleano se o número está na lista
        if ( receiverexists ) {
            const validateCash = require('../auxiliary/resenhaValidationCash');
            const validCash = await validateCash(await client, await message, await value, await giverPhone);

            if ( validCash ) {
                value = parseFloat(value);
                value = value.toFixed(2);
                const balanceNegative = require('../auxiliary/resenhaBalenceNegative');
                const giverHaveCash = await balanceNegative(giverId, value);

                if ( giverHaveCash ) {
                    const balancePositive = require('../auxiliary/resenhaBalancePositive');
                    const sucefullOperation = await balancePositive(reciverId, value);
                    if ( sucefullOperation ) {
                        await client.sendText(await message.chatId,
                        `Pix de _${giverName}_ para _${reciverName}_ no valor de *R₡ ${value}* enfiado no cu com sucesso!`);
                    }
                    else {
                        await client.sendText(await message.chatId,
                        `Deu ruim ao dar *R₡ ${value}* de _${giverName}_ para _${reciverName}}_, se fode aí`);
                    }
                }
                else {
                    await client.sendText(await message.chatId,
                    `_${giverName}_ você não tem *R₡ ${value}* para dar, burro leso do caralho`);
                }
            }
        }
        else {
            await client.sendMentioned(await message.chatId,
            `Contato de @${receiverPhoneWhitout} não existe _${giverName}_ seu animal`,
            [receiverPhoneWhitout]);
        }
    }
    else {
        await client.sendText(await message.chatId,
        `_${giverName}_, já passou do limite de pix hoje sua anta`);
    }
}