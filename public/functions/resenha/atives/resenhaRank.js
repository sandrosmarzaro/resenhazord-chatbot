module.exports = async function(client, message) {
    const resenhaList = require('../auxiliary/resenhaLoadList');

    let first = [], second = [], third = [];
    let resenhistaCoin;
    let resenhistaName;
    for (let index = 0; index < resenhaList.length; index++) {

        resenhistaCoin = resenhaList[index].coin;
        resenhistaName = resenhaList[index].name;
        
        if ( index === 0 ) {
            first.push(resenhistaName);
            first.push(resenhistaCoin);
        }
        else if ( index === 1 ){
            if ( resenhistaCoin > first[1] ) {
                second.push(first[0]);
                second.push(first[1]);
                first[0] = resenhistaName;
                first[1] = resenhistaCoin;
            }
            else {
                second.push(resenhistaName);
                second.push(resenhistaCoin);
            }
        }
        else if ( index === 2 ){
            if ( resenhistaCoin > first[1] ) {
                third.push(second[0]);
                third.push(second[1]);
                second[0] = first[0];
                second[1] = first[1];
                first[0] = resenhistaName;
                first[1] = resenhistaCoin;

            }
            else if (resenhistaCoin > second[1]){
                third.push(second[0]);
                third.push(second[1]);
                second[0] = resenhistaName;
                second[1] = resenhistaCoin;
            }
            else {
                third.push(resenhistaName);
                third.push(resenhistaCoin);
            }
        }
        else {
            if ( resenhistaCoin > first[1] ) {
                third[0] = second[0];
                third[1] = second[1];
                second[0] = first[0];
                second[1] = first[1];
                first[0] = resenhistaName;
                first[1] = resenhistaCoin;
            }
            else if ( resenhistaCoin > second[1] ){
                third[0] = second[0];
                third[1] = second[1];
                second[0] = resenhistaName; 
                second[1] = resenhistaCoin;
            }
            else if ( resenhistaCoin > third[1] ) {
                third[0] = resenhistaName;
                third[1] = resenhistaCoin;
            }
        } 
    }
    first[1] = (first[1].toFixed(2)).replace('.', ',');
    second[1] = (second[1].toFixed(2)).replace('.', ',');
    third[1] = (third[1].toFixed(2)).replace('.', ',');
    await client.sendText(await message.chatId,
    `🏆🎖 *RANK DE COINS* 🎖🏆\n\n🥇 *${first[0]}* \t\t R₡ ${first[1]}\n🥈 *${second[0]}* \t\t R₡ ${second[1]}\n🥉 *${third[0]}* \t\t R₡ ${third[1]}`);
}