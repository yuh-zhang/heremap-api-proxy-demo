const express = require('express');
const axios = require('axios');

const app = express();

app.get('/api/autocomplete/:query', (req,res) => {
    const endpoint = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=31gDSjonTUSDLYb1yTXA&app_code=yfhY1MLeAHqfVBqQHv7UHQ&query=${req.params.query}&maxresults=5&country=AUS`;
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

app.listen(3001, ()=>{
    console.log('app is running on 3001...')
})