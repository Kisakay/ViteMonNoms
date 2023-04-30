const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const readline = require('readline');

require("colors");
console.log("Vite mon noms !".blue.bgWhite);
console.log("Votre prénom du calendrier simplement et rapidement \n\n".blue.bgWhite);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function ddddd(input) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: 'new'});
    const page = await browser.newPage();
    await page.goto('https://www.vitemonprenom.com/', { waitUntil: 'networkidle2' });

    const Inputname = input;

    await page.type("input[id='search-searchbar']", Inputname)
    await page.waitForSelector("span[class='small']");

    const text = await page.evaluate(() => {
        return document.querySelector('div[class="search-result mt-5"]').innerHTML
    })
    await browser.close();

    const $ = cheerio.load(text);
    const name = $('strong').text();

    return name;
}

rl.question('Entre ton magnifique prénom : ', async (answer) => {
    var output = await ddddd(answer)
    if(!output) { output = answer; 
        console.log(`Votre prénom "${output}" est conforme à la loi du 1er avril 1803 ✅
Vous n'aurez pas besoin de changer de prénom en 2022.`.green)
    } else{
        console.log(`Vous allez devoir changer de prénom 😔
Votre nouveau prénom sera : ${output}`.red)
    }
    rl.close();
});
