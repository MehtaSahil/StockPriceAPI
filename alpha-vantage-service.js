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

singleQuote = function(symbol) {
    // Build query string
    let functionParam = 'function=GLOBAL_QUOTE';
    let symbolParam = 'symbol=' + symbol;
    let apiKeyParam = 'apikey=' + config.apiKey;
    let params = [functionParam, symbolParam, apiKeyParam].join('&');
    let queryString = apiBaseUrl + params;

    request.get(queryString, (queryErr, queryRes, queryBody) => {

        // Parse response body to test for errors
        let bodyObj = JSON.parse(queryBody);
        console.log(bodyObj)
        if (bodyObj['Error Message']) {
            // TODO: Communicate 400 BAD REQUEST
            return bodyObj
        } else {
            return parser.parseGlobalQuote(bodyObj);
        }
    })
}

module.exports = {singleQuote: singleQuote}
