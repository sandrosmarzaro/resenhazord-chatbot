module.exports = async function (client, message) {
    const puppeteer = require('puppeteer');

    (async () => {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(`https://rule34.xxx/index.php?page=post&s=random`);
        
        const rule34 = await page.evaluate(() => {
            const nodeList = document.querySelectorAll('div.flexi img');
            const imgArray = [...nodeList];
            
            const imgList = imgArray.map( ({src}) => ({
                src
            }));
            
            return imgList;
        });
        await client.sendImage(message.chatId, rule34[0]['src'], "rule34", "Aqui está sua imagem aleatória!");
        await browser.close();
    })();
}