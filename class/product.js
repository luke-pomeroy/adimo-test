const currency = require('currency.js')
const fs = require('fs')

class Product {

    constructor(title, imageUrl, currentPrice, previousPrice) {
        this.title = title
        this.imageUrl = imageUrl
        this.currentPrice = currentPrice
        this.previousPrice = previousPrice
        this.setDiscount()
    }

    setDiscount() {
        if (!this.previousPrice) {
            this.discountAmount = '£0.00'
        } else {
            this.discountAmount = currency(this.previousPrice)
            .subtract(this.currentPrice)
            .format({symbol: '£'})
        }
    }

    static averageCurrentPrice(products) {
        const sum = products.map(product => currency(product.currentPrice).intValue)
        .reduce((acc, price) => acc + price) / 100

        return currency(sum / products.length).format({symbol: '£'})
    }

    static async saveJsonFile(productData, filePath, fileName) {
        if (productData.length === 0) {
            return 'Error!: Could not save to file, no product data.'
        }
        if (!filePath) {
            return 'Error!: Could not save to file, no filePath provided.'
        }
        if (!fileName) {
            return 'Error!: Could not save to file, no fileName provided.'
        }

        let data = JSON.stringify(productData, null, 2)
        let file = filePath + '/' + fileName
        try {
            await fs.promises.writeFile(file, data)
            return 'JSON data successfully saved to file: ' + file
        } catch (error) {
            return ('Error writing file!: ', error.message)
        }
    }
}

module.exports = Product
