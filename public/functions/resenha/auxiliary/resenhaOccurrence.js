module.exports = async function(phoneId, indexEvent) {
    const atualDate = new Date();
    const atualDay = atualDate.getDay();
    const dailyLimit = 8;
    let resenhaList = require('./resenhaLoadList');
    const writeList = require('./resenhaWriteList');

    let indexAuthor;
    resenhaList.forEach(element => {
        if ( element.id === phoneId ) {
            indexAuthor = element.index;
        }
    });

    if ( resenhaList[indexAuthor].occurences[indexEvent].day != atualDay ) {
        resenhaList[indexAuthor].occurences[indexEvent].day = atualDay;
        resenhaList[indexAuthor].occurences[indexEvent].occurences = 1;
        writeList(resenhaList);
        return true;
    } 
    else if ( resenhaList[indexAuthor].occurences[indexEvent].occurences < dailyLimit ) {
        resenhaList[indexAuthor].occurences[indexEvent].occurences++;
        writeList(resenhaList);
        return true;
    }
    else {
        return false;
    }
}