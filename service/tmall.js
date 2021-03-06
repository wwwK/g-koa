const PCR = require('puppeteer-chromium-resolver');
const cheerio = require('cheerio');
let pcr = null;
let browser = null;
module.exports = {
    price: async (id) => {
        console.log(id);
        if (!pcr) {
            pcr = await PCR();
        }
        if (!browser) {
            browser = await pcr.puppeteer.launch({
                executablePath: pcr.executablePath,
                headless: false
            });
        }

        const page = await browser.newPage();
        await page.goto(`https://detail.tmall.com/item.htm?spm=a1z10.3-b-s.w4011-15437629824.223.779b18da49RNkp&id=${id}&rn=4225aef3f698b9f692a840e9defc0eef&abbucket=4`);
        await page.waitForSelector('.tm-price');
        const html = await page.content();

        const $ = cheerio.load(html);

        const price = $('.tm-price').text();
        await browser.close();
        return price;
    }
}
