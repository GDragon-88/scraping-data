const express = require("express");
const app = express()
const PORT = 3002




const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: "3915eebb0fc0ed86495a9f32fa90ea4e",

        },
        visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
)
puppeteer.launch({ headless: true }).then(async browser => {
    try {
        const page = await browser.newPage()
        await page.goto('https://portal.threetrader.com/login')


        // const setInputValue = ()=>{
        //  document.querySelector("input").value ="broker@p2t.sg"
        //  document.querySelector("input")[1].value ="D6i7vcZG"
        //  console.log(2);

        // }
        // console.log(1);
        // await page.evaluate(setInputValue)
        let inputHandles = await page.evaluate(async () => {
            const inputs = Array.from(document.getElementsByClassName("q-placeholder"))
            return inputs.map(i => i.value)
        })
        console.log(inputHandles);

        const inputValue = ["broker@p2t.sg", "D6i7vcZG"]
        for (let i in inputHandles) {

            await page.type(".q-placeholder", inputValue)
        }
        
        let res = await page.solveRecaptchas()

        console.log(res);
       




        await browser.close()
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(PORT);
})