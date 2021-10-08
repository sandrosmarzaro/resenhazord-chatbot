module.exports = async function(phoneId, cash) {
    let haveCash = false;
    cash = parseFloat((parseFloat(cash)).toFixed(2));
    let resenhaList = require('../auxiliary/resenhaLoadList');
    const writeresenhaList = require('../auxiliary/resenhaWriteList');
    resenhaList.forEach((element) => {
        if ( element.id === phoneId ) {
            if ( element.coin >= cash ) {
                console.log(`\n\nId: ${phoneId}\nCash: ${cash}\nCoin: ${element.coin}\nResult: ${parseFloat((element.coin - cash).toFixed(2))}\n`);
                element.coin = parseFloat((element.coin - cash).toFixed(2));
                writeresenhaList(resenhaList);
                haveCash = true;
            }
        }
    });
    
    return haveCash;
}