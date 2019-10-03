const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();

app.get('/api/autocomplete/:query', (req,res) => {
    const endpoint = `${process.env.ENDPOINT}?app_id=${process.env.APP_ID}&app_code=${process.env.APP_CODE}&query=${req.params.query}&maxresults=5&country=AUS`;
    axios({
        method: 'GET',
        url: endpoint,
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json"
        }
    }).then(response => {
        res.send(JSON.stringify(response.data));
    }).catch(error => {
        res.send(JSON.stringify(error),400);
    });
})
app.use('/',express.static('client'))

app.listen(3001, ()=>{
    console.log('app is running on 3001...')
})