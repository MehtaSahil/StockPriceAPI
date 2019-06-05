const express = require('express');
const request = require('request');
const config = require('./config');
const parser = require('./responseParser')
const logger = require('./logger');
const url = require('url');
const app = express();

const apiBaseUrl = 'https://www.alphavantage.co/query?';

// Enable form parameter parsing
app.use(express.urlencoded({extended: true}));

app.get('/api/quote', (req, res) => {

    logger.log(req.protocol + '://' + req.get('host') + req.originalUrl);

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

app.get('/api/multiquote', (req, res) => {
    logger.log(req.protocol + '://' + req.get('host') + req.originalUrl);

    let quotesObj = {};

    let symbols = req.query.symbol.split(',');
    symbols.forEach((symbol) => {
        console.log('symbol: ' + symbol);
        // Retrieve data from API for each individual symbol
        // Build query string
        let functionParam = 'function=GLOBAL_QUOTE';
        let symbolParam = 'symbol=' + symbol;
        let apiKeyParam = 'apikey=' + config.apiKey;
        let params = [functionParam, symbolParam, apiKeyParam].join('&');
        let queryString = apiBaseUrl + params;

        request.get(queryString, (queryErr, queryRes, queryBody) => {
            console.log('request callback for: ' + symbol);
            let bodyObj = JSON.parse(queryBody);
            quotesObj[symbol] = parser.parseGlobalQuote(bodyObj);

            if (Object.keys(quotesObj).length === symbols.length) {
                res.status(200);
                res.json(quotesObj);
            }
        })
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
