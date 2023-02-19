const { expect } = require('chai')
const axiosScraper = require('../scrape')
const Product = require('../class/product.js')

describe ('Scrape functions', function () {

    describe('axios scraper function - valid url', () => {
        before(function () {
            const url = 'https://cdn.adimo.co/clients/Adimo/test/index.html'
            let result = axiosScraper(url)
        })

        it('should return an Array', () => {
            expect(result).to.be.an('array')
        })

        it('should return an Array containing only Product instances', () => {
            expect(result).to.satisfy(function(products) {
                return products.every(function(product) {
                    return product instanceof Product
                })
            })
        })

        it('should return 10 products from the adimo test url', () => {
            expect(result.length).to.eql(10)
        })
    })

    describe('axios scraper function - no url', () => {
        before(function () {
            const url = ''
            let result = axiosScraper(url)
        })

        it('should return an error if no url is provided', () => {
            expect(result).to.eql('Error!: a url must be provided.')
        })

    })

    describe('axios scraper function - error thrown', () => {
        before(function () {
            const url = ''
            let result = axiosScraper(url)
        })

        it('should return an error if an error is thrown by axios', () => {
            expect(result).to.contain('Error!: ')
        })

    })
})
