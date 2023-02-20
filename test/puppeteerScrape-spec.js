const { chai, expect } = require('chai')
const puppeteerScraper = require('../puppeteerScrape.js')
const Product = require('../class/product.js')

describe ('puppeteerScraper function', function () {
    describe('Valid url for whiskyexchange website', () => {
        let result
        before( async () => {
            result = await puppeteerScraper('https://www.thewhiskyexchange.com/search?q=cider')
        })

        it('should return an Array with no errors', () => {
            expect(result.products).to.be.an('array')
            expect(result.error).to.be.undefined
        })

        it('should return an Array containing only Product instances', () => {
            expect(result.products).to.satisfy(function(products) {
                return products.every(function(product) {
                    return product instanceof Product
                })
            })
        })

        it('should return 145 products from the whisky url (as of 2022-02-20)', () => {
            expect(result.products.length).to.eql(145)
        })
    })

    describe('No url entered', () => {
        let result
        before( async () => {
            result = await puppeteerScraper('')
        })

        it('should return an error if no url is provided, with no products', () => {
            expect(result.error).to.eql('Error!: a url must be provided.')
            expect(result.products).to.be.undefined
        })

    })

    describe('Other error thrown by puppeteer', () => {
        let result
        before( async () => {
            result = await puppeteerScraper('https://cd')
        })
        it('should return an error if an error is thrown by puppeteer, with no products', () => {
            expect(result.error).to.contain('Error!: ')
            expect(result.products).to.be.undefined
        })

    })
})