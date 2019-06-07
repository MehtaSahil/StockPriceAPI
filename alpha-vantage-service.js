/*

A set of utility functions that interface with the alpha vantage API

Provided functions:
singleQuote(symbol)
*/

const request = require('request');

const config = require('./config');
const apiBaseUrl = 'https://www.alphavantage.co/query?';

function singleQuote(symbol) {
    // Build query string
    let queryString = buildQueryString('GLOBAL_QUOTE', symbol);

    // Promise to return the response
    return new Promise((resolve, reject) => {
        request.get(queryString, (queryErr, queryRes, queryBody) => {
            // Parse response body to test for errors
            let bodyObj = JSON.parse(queryBody);
            if (bodyObj['Error Message']) {
                resolve({status: 400, body: bodyObj})
            } else {
                resolve({status: 200, body: parseGlobalQuote(bodyObj)})
            }
        })
    })
}

function buildQueryString(functionType, symbol) {
    let functionParam = 'function=' + functionType;
    let symbolParam = 'symbol=' + symbol;
    let apiKeyParam = 'apikey=' + config.apiKey;
    let params = [functionParam, symbolParam, apiKeyParam].join('&');
    let queryString = apiBaseUrl + params;

    return queryString;
}

function parseGlobalQuote(bodyObj) {
    bodyObj = bodyObj['Global Quote'];

    // Clean version of the response body. This object is sent to the client
    let newBody = {};
    newBody.symbol = bodyObj['01. symbol'];
    newBody.open = bodyObj['02. open'];
    newBody.high = bodyObj['03. high'];
    newBody.low = bodyObj['04. low'];
    newBody.price = bodyObj['05. price'];
    newBody.volume = bodyObj['06. volume'];
    newBody.latest_trading_day = bodyObj['07. latest trading day'];
    newBody.previous_close = bodyObj['08. previous close'];
    newBody.change = bodyObj['09. change'];
    newBody.change_percent = bodyObj['10. change percent'];

    return newBody;
}

module.exports = {singleQuote: singleQuote}
