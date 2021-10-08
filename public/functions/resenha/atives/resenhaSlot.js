module.exports = async function (client, message) {
    const searchName = require('../auxiliary/resenhaSearchName');
    const nameResenhista = await searchName(await message.author);
    
    const validationOccurrence = require('../auxiliary/resenhaOccurrence');
    const occurence = await validationOccurrence(await message.author, 2);
    if ( occurence ) {
        const negativeFlow = require('../auxiliary/resenhaBalenceNegative');
        const cashFlow = await negativeFlow(await message.author, 50);

        console.log(`\n\tSLOT MACHINE REPORT\n\n\n`);
        console.log(`Random Index:`);
        if ( cashFlow ) {
            const characterList = ['🎰', '🗿', '🐵', '🍑', '🍆', '🏳️‍🌈', '🐮'];
            let sortedCharacterList = [];
    
            for (let index = 0; index < 3; index++) {
                let numberRandom = Math.floor(Math.random() * 7);
                console.log(numberRandom);
                sortedCharacterList.push(characterList[numberRandom]);
            }
            console.log(`Round:\t${sortedCharacterList}`);
    
            let awardValue;
            const fs = require('fs');
            const filePath = 'public/data/resenha/jackpotSlot.json';
            const fileBuffer = fs.readFileSync(filePath);
            const fileJson = JSON.parse(fileBuffer);
            let storedAward = fileJson;
    
            if ( sortedCharacterList[0] === sortedCharacterList[1] && sortedCharacterList[1] === sortedCharacterList[2] ) {
                switch (sortedCharacterList[0]) {
                    case '🎰':
                        awardValue = storedAward.jackpot;
                        break;
                    case '🗿':
                        awardValue = storedAward.jackpot * 0.30;
                        break;
                    case '🐵':
                        awardValue = storedAward.jackpot * 0.20;
                        break;
                    case '🍑':
                        awardValue = storedAward.jackpot * 0.10;
                        break;
                    case '🍆':
                        awardValue = storedAward.jackpot * 0.10;
                        break;
                    case '🏳️‍🌈':
                        awardValue = storedAward.jackpot * 0.20;
                        break;
                    case '🐮':
                        awardValue = storedAward.jackpot * 0.40;
                        break;
                }
                console.log(`Award Value:\t${awardValue}`);
                console.log(`Jackpot Before:\t${storedAward.jackpot}`);
                storedAward.jackpot -= parseFloat(awardValue.toFixed(2));
                console.log(`Jackpot After:\t${storedAward.jackpot}`);
                
                await client.sendText(await message.chatId,
                `Resultado da tentativa de _${nameResenhista}_\n\t| ${sortedCharacterList[0]} | ${sortedCharacterList[1]} | ${sortedCharacterList[2]} |\nCagão levou *R₡ ${awardValue}*`);
                const positiveFlow = require('../auxiliary/resenhaBalancePositive');
                const sucefullOperation = await positiveFlow(await message.author, parseFloat(awardValue.toFixed(2)));
            }
            else {
                storedAward.jackpot += 50;
                await client.sendText(await message.chatId,
                `Resultado da tentativa de _${nameResenhista}_\n\t| ${sortedCharacterList[0]} | ${sortedCharacterList[1]} | ${sortedCharacterList[2]} |\nSe fudeu por enquanto...\nAcumulado *R₡ ${storedAward.jackpot}*`);
            }
            const fileString = JSON.stringify(storedAward, null, '\t');
            fs.writeFileSync(filePath, fileString, 'utf-8');
        }
        else {
            await client.sendText(await message.chatId, 
            `_${nameResenhista}_ você não tem *R₡ 50* para rodar o caça níquel seu burro`);
        }
    }
    else {
        await client.sendText(await message.chatId, 
            `_${nameResenhista}_ já atingiu o limite de hoje do caça níquel seu leso`);
    }
}