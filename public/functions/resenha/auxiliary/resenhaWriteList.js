module.exports = function(register) {
    const fs = require('fs');
    const filePath = 'public/data/resenha/resenha.json';
    const fileString = JSON.stringify(register, null, '\t');
    fs.writeFileSync(filePath, fileString, 'utf-8');
}