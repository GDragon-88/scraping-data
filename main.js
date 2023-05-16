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

    await page.solveRecaptchas();

    

    await page.waitForTimeout(5000);

    await page.click('button:is(:text("LOGIN"))');

    const navigationPromise = page.waitForNavigation();

    await navigationPromise;

    await page.click('button:is(:text("CLOSE"))');

    await page.click('button:is(:text("IB Portal"))');

    await page.getByText("Rebate Report").click();

   await page.getByRole("textbox").first().fill("522273")



    await page.click('button:is(:text("APPLY"))')   

    await page.waitForTimeout(5000)
   

    await page.getByText("Request History").click()

    await page.screenshot({ path: "scrapingant.png" })

    // await browser.close()
  } catch (error) {
    console.log(error)
  }
});

app.listen(PORT, () => {
  console.log(PORT);
})
   