// const express = require('express')
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
// import axios from 'axios';
import { read, write, walk, exists } from "files";
// import fetch from 'node-fetch';
// import { HttpsProxyAgent } from 'https-proxy-agent';
// import * as https from 'https';

import * as cheerio from 'cheerio';
import { type } from "os";
import { title } from "process";



const app = express()
const port = 3333

app.use(bodyParser.json())
app.use(cors());



app.get('/', (req, res) => {
    res.send('Getting on server!')
})


app.post('/', async (req, res) => {



    // const dd = {
    //     newId: id*100,
    // }

    const data = {
        c0: String,
        c2: String
    }

    // const getHtml = async () => {
    //     const res = await fetch('https://atcoder.jp/contests/abc123/tasks/abc123_a');
    //     if(res.ok){
    //         const data = await res.text();
    //         console.log(await write("app/backend/data/cc.html", data).then(read));
    //         // console.log(data);
    //     }
    // }

    // getHtml();

    const html = await read("app/backend/data/cc.html");

    // console.log(html);

    const $ = cheerio.load(html);

    // console.log($('.h2').text());
    // await write("app/backend/data/title.txt", $("span[class=h2]").text());
    // await write("app/backend/data/content_0.txt", $("span[class=lang-en] .part section").eq(0).html());
    // await write("app/backend/data/content_1.txt", $("span[class=lang-en] .part section").eq(1).html());
    // await write("app/backend/data/content_2.txt", $("span[class=lang-en] .part section").eq(2).html());
    // await write("app/backend/data/content_3.txt", $("span[class=lang-en] .part section").eq(3).html());
    // await write("app/backend/data/content_4.txt", $("span[class=lang-en] .part section").eq(4).html());
    // await write("app/backend/data/content_5.txt", $("span[class=lang-en] .part section").eq(5).html());
    // await write("app/backend/data/content_6.txt", $("span[class=lang-en] .part section").eq(6).html());
    // console.log(html);

    const sections = $("span[class=lang-en] .part section");

    // for (let i = 0; i < sections.length; i++) {
    // const section = sections.eq(i);
    // const sectionHtmlText = section.text();
    //     // await write("app/backend/data/content_"+i+".html", sectionHtml);
    //     data.htmls.push(sectionHtmlText);
    // }

    data.c0 = sections.eq(0).html()
    data.c2 = sections.eq(2).html()



    // console.log(data);

    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log("Server start........");  

    console.log(data.c0);
    console.log(data.c2);

    console.log("Server end........");
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")

    res.send(data)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
   