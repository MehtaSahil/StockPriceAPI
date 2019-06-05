# StockPriceAPI
A simple API (Node + Express) to retrieve stock price information. This API is a wrapper for the API developed by [Alpha Vantage](https://www.alphavantage.co/).

---
# Getting Started (for Developers)
### Running the Service
As of 6/4/2019 the StockPriceAPI is still in early phases of development and as such is not deployed. Follow these steps to run the service locally:
1. Install Node.js and npm (Node Package Manager) by visiting [nodejs.org](https://nodejs.org)
1. Open a terminal, clone the master branch of this repository, and change into the `StockPriceAPI` directory.
1. Run the `npm install` command to install all dependencies required by the service. This may take some time.
1. Create a `config.js` file in the `StockPriceAPI` directory. This file contains a `config` object in which your personal API key and the name of your logfile live. This file is not pushed to GitHub to ensure that the API key and logfile remain private.
1. Copy the following block of code into your `config.js` file. Then onsert your specific API key and logfile name. If you do not have an API key, visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key) website to claim one for **free**.

    ```
    const config = {
        apiKey: '[YOUR API KEY]',
        logFile: 'logs.txt'
    }

    module.exports = config;
    ```
1. Run the `npm run dev` command. Starting the service this way restarts the service each time a file is changed. Running `npm run start` will simply start the service, but any changes will require a server restart.

### Retrieving Data
As of 6/4/2019 the StockPriceAPI supports the retrieval of current stock quotes for single stock symbols (e.g. MSFT, FB, F, GOOG, etc). Authentication is not yet implemented. The API is accessible through a dedicated client and through any client application that supports API calls.

Perform a GET request on the following endpoint: `http://localhost:5000/api/quote?symbol=MSFT` and, assuming everything is configured properly, expect a `200 OK` with the following response body:
```
{
    "symbol": "MSFT",
    "open": "121.2800",
    "high": "123.2700",
    "low": "120.6600",
    "price": "123.1600",
    "volume": "24194686",
    "latest_trading_day": "2019-06-04",
    "previous_close": "119.8400",
    "change": "3.3200",
    "change_percent": "2.7704%"
}
```

Performing a request for an unsupported symbol results in a `200 OK` with the following **empty** response body:
```
{}
```

Performing a request for an empty symbol (`''`) results in a `400 BAD REQUEST` with the following  response body:
```
{
    "Error Message": "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for GLOBAL_QUOTE."
}
```
