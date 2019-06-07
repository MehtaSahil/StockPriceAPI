const express = require('express');
const request = require('request');

const config = require('./config');
const parser = require('./responseParser')
const logger = require('./logger');
const alphaVantageService = require('./alpha-vantage-service')

const app = express();
const apiBaseUrl = 'https://www.alphavantage.co/query?';

// Enable form parameter parsing
app.use(express.urlencoded({extended: true}));

app.get('/api/quote', (req, res) => {

    logger.log(req.protocol + '://' + req.get('host') + req.originalUrl);

    alphaVantageService.singleQuote(req.query.symbol).then((responseInfo) => {
        res.status(responseInfo.status)
        res.json(responseInfo.body)
    }).catch((err) => {console.log(err)});
});

app.get('/api/multiquote', (req, res) => {
    logger.log(req.protocol + '://' + req.get('host') + req.originalUrl);

    let responses = {};
    let promises = [];

    // Start requests
    let symbols = req.query.symbol.split(',');
    symbols.forEach((symbol) => {
        promises.push(alphaVantageService.singleQuote(symbol))
    })

    // Resolve requests and return to client
    Promise.all(promises).then((responseInfos) => {

        /*
        Could do this aggregation in the .then() for each individual promise,
        but we might run into concurrency issues (I'm not sure). It is safter to
        wait for all responses to come in before aggregation.
        */
        responseInfos.forEach((responseInfo) => {
            responses[responseInfo.body.symbol] = responseInfo.body
        })

        res.status(200);
        res.json(responses);
    })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
