const fs = require('fs');
const filePath = 'public/data/resenha/resenha.json';
const fileBuffer = fs.readFileSync(filePath);
const fileJson = JSON.parse(fileBuffer);
let register = fileJson;
module.exports = register;