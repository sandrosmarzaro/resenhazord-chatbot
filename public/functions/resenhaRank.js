module.exports = async function(client, message) {
    const fs = require('fs');
    const filePath = 'public/data/resenha.json';
    const fileBuffer = fs.readFileSync(filePath);
    const fileJson = JSON.parse(fileBuffer);
    let register = fileJson;

    let first = [], second = [], third = [];
    let resenhistaPhone;
    let resenhistaCoin;
    for (let index = 0; index < register.length; index++) {
        if ( register[index].phone !== "552899223882@c.us" ){

            resenhistaPhone = register[index].phone.split('@');
            resenhistaPhone = resenhistaPhone[0];
            resenhistaCoin = register[index].coin;
            
            if ( index === 0 ) {
                first.push(resenhistaPhone);
                first.push(resenhistaCoin);
            }
            else if ( index === 1 ){
                if ( resenhistaCoin > first[1] ) {
                    second.push(first[0]);
                    second.push(first[1]);
                    first[0] = resenhistaPhone;
                    first[1] = resenhistaCoin;
                }
                else {
                    second.push(resenhistaPhone);
                    second.push(resenhistaCoin);
                }
            }
            else if ( index === 2 ){
                if ( resenhistaCoin > first[1] ) {
                    third.push(second[0]);
                    third.push(second[1]);
                    second[0] = first[0];
                    second[1] = first[1];
                    first[0] = resenhistaPhone;
                    first[1] = resenhistaCoin; 
                }
                else if (resenhistaCoin > second[1]){
                    third.push(second[0]);
                    third.push(second[1]);
                    second[0] = resenhistaPhone;
                    second[1] = resenhistaCoin;
                }
                else {
                    third.push(resenhistaPhone);
                    third.push(resenhistaCoin);
                }
            }
            else {
                if ( resenhistaCoin > first[1] ) {
                    third[0] = second[0];
                    third[1] = second[1];
                    second[0] = first[0];
                    second[1] = first[1];
                    first[0] = resenhistaPhone;
                    first[1] = resenhistaCoin;

                }
                else if ( resenhistaCoin > second[1] ){
                    third[0] = second[0];
                    third[1] = second[1];
                    second[0] = resenhistaPhone;
                    second[1] = resenhistaCoin;
                }
                else if ( resenhistaCoin > third[1] ) {
                    third[0] = resenhistaPhone;
                    third[0] = resenhistaCoin;
                }
            } 
        }
    }
    await client.sendMentioned(await message.chatId,
        `🏆🎖 *RANK DE COINS* 🎖🏆\n\n🥇 @${first[0]} R₡ ${first[1]}\n🥈 @${second[0]} R₡ ${second[1]}\n🥉 @${third[0]} R₡ ${third[1]}`,
        
        [first[0], second[0], third[0]]);
}