const axios = require('axios')
const cheerio = require('cheerio')
const Product = require('./class/product')

const axiosScraper = async (url) => {
    if (!url) {
        return { error: 'Error!: a url must be provided.' }
    }
    let products = []

    try {
        const response = await axios.get(url)
        let $ = cheerio.load(response.data)

        $('div.item').each(function(i, elem){
            let product = new Product (
                title = $(elem).find('h1').text(),
                imageUrl = $(elem).find('img').attr('src'),
                currentPrice = $(elem).find('span.price').text(),
                previousPrice = $(elem).find('span.oldPrice').text()
            )
            products.push(product)
        })

        return { products: products }
        
    } catch (error) {
        return { error: 'Error!: ' + error.message }
    }
}

module.exports = axiosScraper
