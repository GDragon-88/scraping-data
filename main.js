const express = require("express");
const app = express();
const PORT = 3002;

const { chromium } = require("playwright-extra");

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
chromium.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "3915eebb0fc0ed86495a9f32fa90ea4e",
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
  })
);
chromium.launch({ headless: false }).then(async (browser) => {
  try {
    const page = await browser.newPage();
    await page.goto("https://portal.threetrader.com/login");

    await page.getByLabel("email").fill("broker@p2t.sg");

    await page.getByLabel("Password").fill("D6i7vcZG");

    let res = await page.solveRecaptchas();

    console.log(res);

    await page.waitForTimeout(5000);

    await page.click('button:is(:text("LOGIN"))');

    const navigationPromise = page.waitForNavigation();

    await navigationPromise;

    await page.click('button:is(:text("CLOSE"))');

    await page.click('button:is(:text("IB Portal"))');

    await page.getByText("Rebate Report").click();

//   await page.fill(".Form-data > .search-account > .el-input__inner", "522273")
    
   
await page.$$eval('input[type="text"]', (elements, value) => {
    elements.forEach(async (element,i) => {
        console.log(element)
     if(i==2){
        element.focus()
        element.setAttribute("placeholder" ,"chien")
      
     }
    });
  }, '522273')

  const input = page.$('input[placeholder="chien"]')
  await input.type('0321')
    await page.click('button:is(:text("APPLY"))')
   

    
    
    // console.log(inputLocator)
//  (await page.waitForSelector("input[class='el-input__inner']"))
    
//    await  page.getByLabel("Enter Trading Account").fill('255158')
    await page.screenshot({ path: "scrapingant.png" })

    // await browser.close()
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(PORT);
});
