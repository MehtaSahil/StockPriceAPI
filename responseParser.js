/*
Set of utility functions to parse responses from the source API before
sending data back to the client.
*/

parseGlobalQuote = function(bodyObj) {

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

module.exports = {parseGlobalQuote: parseGlobalQuote};
