const readline = require('node:readline')
const axiosScraper = require('./scrapers/axios')
const puppeteerScraper = require('./scrapers/puppeteer')
const Product = require('./models/product')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const printHelp = () => {
    console.log('Selection options:')
    console.log('"1" to get cheeses from the adimo test site')
    console.log('"2" to fetch results from thewhiskyexchange.com')
}

const selectOption = () => {
    printHelp()
    rl.question('Which option would you like to pick? ', getSelection)
}

const getSelection = (selection) => {
    if (!selection || !(['1', '2'].includes(selection))) {
        console.log('\nPlease enter a valid option!\n')
        selectOption()
    } else {
        if (selection === '1') {
            rl.close()
            let url = 'https://cdn.adimo.co/clients/Adimo/test/index.html'
            return fetchResults(url, axiosScraper)
        }
        rl.question('Enter your search term (or just enter "cider"): ', validateSearchTerm)
    }
}

const validateSearchTerm = (searchTerm) => {
    if (!searchTerm) {
        console.log('\nA search term must be entered!\n')
        return selectOption()
    }
    rl.close()
    console.log('Fetching results...')
    let url = `https://www.thewhiskyexchange.com/search?q=${encodeURIComponent(searchTerm)}&psize=120`
    return fetchResults(url, puppeteerScraper)
}

const fetchResults = async (url, cb) => {
    const result = await cb(url)

    if (result.error) {
        console.error(result.error)
        return
    }

    if (result.products.length > 0) {
        let isoDate = new Date().toISOString()

        let exportData = {
            url: url,
            dateRetrieved: isoDate,
            totalProducts: result.products.length,
            averagePrice: Product.averageCurrentPrice(result.products),
            products: result.products
        }

        let fileResult = await Product.saveJsonFile(exportData, 'output', isoDate + '.json')
        console.log(fileResult)
        return
    } else {
        console.log('No products found on page!')
        return
    }
}

selectOption()
