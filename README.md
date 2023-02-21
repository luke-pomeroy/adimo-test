# Adimo take-home test

The task for this take-home test was to:
* Use a basic starter node.js axios web scraper to download the HTML from an imaginary cheese store products page [https://cdn.adimo.co/clients/Adimo/test/index.html](https://cdn.adimo.co/clients/Adimo/test/index.html)
* Then process the HTML and save out a JSON file with:

1. Each product as it's own object containing.
    * title
    * image url
    * price and any discount.
2. The total number of items
3. The average price of all items.

The task also included 2 challenges:
1. Extract the same data as above from [https://www.thewhiskyexchange.com/search?q=cider](https://www.thewhiskyexchange.com/search?q=cider)
2. Consider how the query parameter could be made dynamic so a user can provide their own search term.

## Description of solution

### Basic structure and operation
* Products are represented by a Product class, with an instance method to calculate any discount.
* The Product class also includes static methods for returning an average current price, and saving a JSON file.
* The scrapers directory contains two files with scraper functions for axios and puppeteer.
* The app.js file uses readline to prompt input from the user, and call the relevant scraper function.
* Any errors produced are logged to the console.

### Handling of currency values
* Considered using regular expression to extract the currency value and convert to an integer
* Ultimately I used the currency.js library to streamline currency calculations

### Format of JSON output
* JSON files are exported to an output directory with an ISO datetime as the filename.
* The JSON includes an array of all products, the URL, date retrieved, total number of products, and the average price of all products.

### Design considerations
* A 403 Forbidden response was returned when using Axios with the Whisky Exchange site; setting User-Agent headers, using a proxy and connecting to the Host IP returned the same result.
* While puppeeer does work for the Whisky Exhchange site, it's very slow in comparison to Axios.
* Other HTTP libraries designed to work around Cloudflare protection could be explored, such as [Cloudscraper](https://github.com/VeNoMouS/cloudscraper). The products could then be extracted using the pagination URL parameter for each page in turn.

* In production I would implement this as a HTTP REST API using Express.js, with input recieved via URL parameters.
* URL parameters for the DOM selectors and variable names could also be used, to make the app more dynamic and usable for different websites.

### Production deployment
* A Dockerfile could be used to deploy this to a production server as a Docker container image (an example is included), so that the app and any dependencies are easier to maintain / faster to deploy.

## Getting Started

### Dependencies
* [Mocha](https://mochajs.org/) - testing framework
* [Chai](https://www.chaijs.com/) - assertion library for tests
* [Axios](https://axios-http.com/docs/intro) - HTTP client
* [Cheerio](https://cheerio.js.org/) - HTML parsing library for Axios responses
* [Puppeteer](https://pptr.dev/) - headless browser control
* [File System](https://nodejs.org/api/fs.html) - file system module
* [Currency.js](https://currency.js.org/) - library for working with currency values

### Installation

* Install npm dependencies:
```
npm install
```
* An 'output' directory will be created automatically the first time the app is executed.

### Execution

* To run the tests:
```
npm run test
```

* To run the program:
```
node app.js
```
Or
```
npm start
```
