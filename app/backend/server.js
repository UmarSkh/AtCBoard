// const express = require('express')
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
const app = express()
const port = 3333

app.use(bodyParser.json())
app.use(cors());



app.get('/', (req, res) => {
    res.send('Getting on server!')
})


app.post('/', (req, res) => {
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")
    console.log("Server start........");  

    console.log(req.body);

    const id = req.body.id


    console.log("Server end........");
    console.log(".")
    console.log(".")
    console.log(".")
    console.log(".")


    const data = {
        newId: id*100,
    }
    
    res.send(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
   