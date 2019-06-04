const express = require('express');
const request = require('request');
const config = require('./config.js');
const parser = require('./responseParser.js')
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/api/quote', (req, res) => {

    // Build query string
    functionParam = 'function=GLOBAL_QUOTE';
    symbolParam = 'symbol=' + req.query.symbol;
    apiKeyParam = 'apikey=' + config.apiKey;
    params = [functionParam, symbolParam, apiKeyParam].join('&');
    queryString = config.apiBaseUrl + params;

    request.get(queryString, (queryErr, queryRes, queryBody) => {

        // Parse response body to test for errors
        bodyObj = JSON.parse(queryBody);
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
