const express = require('express');
const request = require('request');

const config = require('./config');
const logger = require('./logger');
const alphaVantageService = require('./alpha-vantage-service')

const app = express();

// Enable form parameter parsing
app.use(express.urlencoded({extended: true}));

app.get('/api/quote', (req, res) => {
    logger.log(req.protocol + '://' + req.get('host') + req.originalUrl);

    alphaVantageService.singleQuote(req.query.symbol, (responseInfo) => {
        res.status(responseInfo.status)
        res.json(responseInfo.body)
    })
});

app.get('/api/multiquote', (req, res) => {
    logger.log(req.protocol + '://' + req.get('host') + req.originalUrl);

    let symbols = req.query.symbol.split(',');
    alphaVantageService.multiQuote(symbols, (responses) => {
        res.status(200);
        res.json(responses);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
