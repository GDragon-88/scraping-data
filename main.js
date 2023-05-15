const express = require("express");
const app = express()
const PORT = 3000
app.listen(PORT,()=>{
    console.log(PORT);
})

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer'); 

(async () => {
  const pathToExtension = require('path').join(__dirname, '2captcha-solver');
  puppeteer.use(StealthPlugin())
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
    executablePath: executablePath()
  });
  
  const [page] = await browser.pages()

  await page.goto("https://portal.threetrader.com/login")

  await page.waitForSelector("#recaptcha-anchor")
  await page.click('#recaptcha-anchor') 
  await page.waitForSelector(`#recaptcha-anchor[data-state="solved"]`,{timeout:18000}) 

})();

