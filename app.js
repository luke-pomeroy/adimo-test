const axiosScraper = require('./scrape')
const Product = require('./class/product')

let url = 'https://cdn.adimo.co/clients/Adimo/test/index.html'

axiosScraper(url).then(async result => {
    if (result.error) {
        return console.log(result.error)
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
    } else {
        return 'No products found on page!'
    }

    return 'Something else went wrong!'
})
