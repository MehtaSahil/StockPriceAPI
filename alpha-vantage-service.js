/*

A set of utility functions that interface with the alpha vantage API

Provided functions:
singleQuote(symbol)

multiQuote(symbols)


*/

const request = require('request');

const config = require('./config');
const parser = require('./responseParser');
const apiBaseUrl = 'https://www.alphavantage.co/query?';

function singleQuote(symbol) {
    // Build query string
    let functionParam = 'function=GLOBAL_QUOTE';
    let symbolParam = 'symbol=' + symbol;
    let apiKeyParam = 'apikey=' + config.apiKey;
    let params = [functionParam, symbolParam, apiKeyParam].join('&');
    let queryString = apiBaseUrl + params;

    // Promise to return the response
    return new Promise((resolve, reject) => {
        request.get(queryString, (queryErr, queryRes, queryBody) => {
            // Parse response body to test for errors
            let bodyObj = JSON.parse(queryBody);
            if (bodyObj['Error Message']) {
                resolve({status: 400, body: bodyObj})
            } else {
                resolve({status: 200, body: parser.parseGlobalQuote(bodyObj)})
            }
        })
    })
}

module.exports = {singleQuote: singleQuote}
