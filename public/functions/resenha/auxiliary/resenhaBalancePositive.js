module.exports = async function (phoneId, cash) {
    sucefullOperation = false;
    cash = parseFloat(cash);
    let resenhaList = require('../auxiliary/resenhaLoadList');
    resenhaList.forEach((element) => {
        if ( element.id === phoneId ) {
            console.log(`Coin Before: ${element.coin}`);
            element.coin = parseFloat((cash + element.coin).toFixed(2));
            console.log(`Coin After: ${element.coin}`);
            const writeList = require('../auxiliary/resenhaWriteList');
            writeList(resenhaList);
            sucefullOperation = true;
        }
    });
    return sucefullOperation;
}