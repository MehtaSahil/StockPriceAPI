const express = require('express');
const config = require('./config');
const request = require('request');
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/api/quote', (req, res) => {

    if (!req.query.symbol) {
        res.status(400);
        return res.json({msg: 'Please provide a stock symbol'});
    }


    // Build query string
    functionParam = 'function=GLOBAL_QUOTE';
    symbolParam = 'symbol=' + req.query.symbol;
    apiKeyParam = 'apikey=' + config.apiKey;
    params = [functionParam, symbolParam, apiKeyParam].join('&');
    queryString = config.apiBaseUrl + params;

    var obj = {};
    request.get(queryString, (queryErr, queryRes, queryBody) => {
        // console.log('body: ', body);
        res.send(queryBody);
    })

});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
