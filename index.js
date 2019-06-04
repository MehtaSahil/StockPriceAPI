const express = require('express');
const request = require('request');
const config = require('./config.js');
const parser = require('./responseParser.js')
const app = express();

const apiBaseUrl = 'https://www.alphavantage.co/query?';

// Enable form parameter parsing
app.use(express.urlencoded({extended: true}));

app.get('/api/quote', (req, res) => {

    // Build query string
    let functionParam = 'function=GLOBAL_QUOTE';
    let symbolParam = 'symbol=' + req.query.symbol;
    let apiKeyParam = 'apikey=' + config.apiKey;
    let params = [functionParam, symbolParam, apiKeyParam].join('&');
    let queryString = apiBaseUrl + params;

    request.get(queryString, (queryErr, queryRes, queryBody) => {

        // Parse response body to test for errors
        let bodyObj = JSON.parse(queryBody);
        if (bodyObj['Error Message']) {
            res.status(400);
            res.json(bodyObj);
        } else {
            res.json(parser.parseGlobalQuote(bodyObj));
        }
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
