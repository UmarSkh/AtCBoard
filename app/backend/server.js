import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';

const app = express()
const port = 3333

app.use(bodyParser.json())
app.use(cors());



app.get('/', (req, res) => {
    res.send('Getting on server!')
})

app.post('/', async (req, res) => {

    let receivedData = req.body;
    let ctype = receivedData.ctype;
    let cid = receivedData.cid;
    let ctask = receivedData.ctask;

    if(cid.length === 1){
        cid = "00" + cid;
    }
    if(cid.length === 2){
        cid = "0" + cid;
    }

    const problemUrl = "https://atcoder.jp/contests/"+ ctype + cid +"/tasks/"+ ctype + cid +"_" + ctask;

    console.log(problemUrl);



    const data = {
        "htmls": []
    }

    async function getDynamicHTML(url) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const html = await page.content();
      await browser.close();
      return html;
    }
    
    await getDynamicHTML(problemUrl).then(async (html) => {
        try {
            const $ = cheerio.load(html);
    
            // $('.katex-mathml').remove();
            $('.katex-html').remove();
    
            const sections = $("span[class=lang-en] .part section");
        
            for(let i=0;i<sections.length;i++){
                data.htmls.push(sections.eq(i).html());
            }
    
            res.send(data);
    
        } catch (error) {
            console.error("Error processing HTML:", error);
            res.status(500).send({ error: "Internal server error" });
        }
    });

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
   