const { expect } = require('chai')
const axiosScraper = require('../axiosScrape')
const Product = require('../class/product.js')

describe('axiosScrape function', function () {
    describe('Valid url for Adimo test site', () => {
        let result
        beforeEach( async () => {
            result = await axiosScraper('https://cdn.adimo.co/clients/Adimo/test/index.html')
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

        it('should return 10 products from the adimo test url', () => {
            expect(result.products.length).to.eql(10)
        })
    })

    describe('No url entered', () => {
        let result
        beforeEach( async () => {
            result = await axiosScraper('')
        })

        it('should return an error if no url is provided, with no products', () => {
            expect(result.error).to.eql('Error!: a url must be provided.')
            expect(result.products).to.be.undefined
        })

    })

    describe('Other error thrown by axios', () => {
        let result
        beforeEach( async () => {
            result = await axiosScraper('https://cd')
        })
        it('should return an error if an error is thrown by axios, with no products', () => {
            expect(result.error).to.contain('Error!: ')
            expect(result.products).to.be.undefined
        })

    })
})
