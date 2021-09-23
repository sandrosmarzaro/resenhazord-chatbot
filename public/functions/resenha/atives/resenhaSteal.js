module.exports = async function(client, message, command) {
    const dataCommands = command.split(' ');

    const victimPhoneAt = dataCommands[1];
    const victimPhone = victimPhoneAt.slice(1, victimPhoneAt.lenght);
    const victimId = victimPhone + "@c.us";
    let victimName;
    let victimCash;
    let victimPosition;
    
    const thiefId = await message.author;
    let thiefName;
    let thiefCash;
    let thiefPosition;

    let register = require('../auxiliary/resenhaLoadList');
    const writeList = require('../auxiliary/resenhaWriteList');
    const validationCash = require('../auxiliary/resenhaBalenceNegative');

    register.forEach((element, index) => {
        if ( element.id === victimId) {
            victimCash = element.coin;
            victimName = element.name;
            victimPosition = index;
        }
        else if ( element.id === thiefId ) {
            thiefCash = element.coin;
            thiefName = element.name;
            thiefPosition = index;
        }
    });
    const validationOccurrence = require('../auxiliary/resenhaOccurrence');
    const occurence = await validationOccurrence(thiefId, 1);
    if ( occurence ) {
        if ( thiefCash > 0 && victimCash > 0 ) {
        
            const valueRobbery = 0.50;
            const validCash = await validationCash(thiefId, valueRobbery);
            thiefCash = register[thiefPosition].coin;                               //Debugger
            if ( validCash ) {
                const randomChance =  parseFloat((Math.random()).toFixed(2));
                const multiplicateFactor = 4;
                let robberyChance = 0.5;
                let monetaryRatio;
    
                if ( thiefCash < victimCash ) {
                    monetaryRatio = ((victimCash / thiefCash) * multiplicateFactor) / 100;
                    monetaryRatio = parseFloat((monetaryRatio.toFixed(2)));
                    robberyChance += monetaryRatio;
                }
                else {
                    monetaryRatio = (( thiefCash / victimCash) * multiplicateFactor) / 100;
                    monetaryRatio = parseFloat((monetaryRatio.toFixed(2)));
                    robberyChance -= monetaryRatio;
                }
                if ( monetaryRatio > 0.65) { 
                    monetaryRatio = 0.65;
                }
    
                if ( robberyChance > randomChance ) {
                    const stolenValue = parseFloat((victimCash * monetaryRatio).toFixed(2));
    
                    const atualCoinThief = register[thiefPosition].coin;
                    const newCoinThief = parseFloat((atualCoinThief + stolenValue).toFixed(2));
                    register[thiefPosition].coin = newCoinThief;
    
                    const atualCoinVictim = register[victimPosition].coin;
                    const newCoinVictim = parseFloat((atualCoinVictim - stolenValue).toFixed(2));
                    register[victimPosition].coin = newCoinVictim;
        
                    await client.sendText(await message.chatId,
                    `_${thiefName}_ catou *R₡ ${stolenValue}* de _${victimName}_`);
                }
                else {
                    const atualCoinVictim = register[victimPosition].coin;
                    const newCoinVictim = parseFloat((atualCoinVictim + valueRobbery).toFixed(2));
                    register[victimPosition].coin = newCoinVictim;
    
                    await client.sendText(await message.chatId,
                    `_${thiefName}_ tentou roubar _${victimName}_ mas não conseguiu...\nOtário se fudeu e deu *R₡ 150* pro outro`);
                }
    
                writeList(register);
            }
            else {
                await client.sendText(await message.chatId,
                `_${thiefName}_ não tem *R₡ 150* para tentar roubar _${victimName}_ burro leso do caralho`);
            }
        }
        else {
            await client.sendText(await message.chatId,
            `_${thiefName}_ ou _${victimName}_ não podem ter nome no SPC`);
        }
    }
    else {
        await client.sendText(await message.chatId,
        `_${thiefName}_ já passou do limites de roubos hoje sua mula!`);
    }
}