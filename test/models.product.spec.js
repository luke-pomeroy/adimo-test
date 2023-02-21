const { expect } = require('chai')
const Product = require('../models/product.js')

describe ('Product class', function () {
    let product1, product2, product3, products, averageProductPrice

    beforeEach(function() {
        // Product properties: title, imageUrl, currentPrice, previousPrice, discountAmount
        product1 = new Product(
            'Cashel Blue',
            'https://cdn.adimo.co/clients/Adimo/test/images/cashelblue.jpg',
            '£5.43',
            ''
        )
        product2 = new Product(
            'Dunshyre Blue',
            'https://cdn.adimo.co/clients/Adimo/test/images/dunshyreblue.jpg',
            '£8.00',
            ''
        )
        product3 = new Product(
            'Dunshyre Blue',
            'https://cdn.adimo.co/clients/Adimo/test/images/evesselection.jpg',
            '£45.00',
            '£50.00'
        )
        products = [product1, product2, product3]
        averageProductPrice = Product.averageCurrentPrice(products)
    })

    describe('Product constructor', () => {
        it('should have set the title property', () => {
            expect(product1).to.have.property('title')
            expect(product1.title).to.eql('Cashel Blue')
        })

        it('should have set the imageUrl property', () => {
            expect(product1).to.have.property('imageUrl')
            expect(product1.imageUrl).to.eql('https://cdn.adimo.co/clients/Adimo/test/images/cashelblue.jpg')
        })

        it('should have set the currentPrice property', () => {
            expect(product1).to.have.property('currentPrice')
            expect(product1.currentPrice).to.eql('£5.43')
        })

        it('should have set the previousPrice property', () => {
            expect(product1).to.have.property('previousPrice')
            expect(product1.previousPrice).to.eql('')
        })

        it('should have set the discountAmount property', () => {
            expect(product1).to.have.property('discountAmount')
        })
    })

    describe('setDiscount instance method', () => {
        it('should set discountAmount to £0.00 if !previousPrice', () => {
            expect(product1.discountAmount).to.eql('£0.00')
        })

        it('should set discountAmount correctly if previousPrice', () => {
            expect(product3.discountAmount).to.eql('£5.00')
        })
    })

    describe('averageCurrentPrice static method', () => {
        // Fractions of pence should be rounded to the nearest penny, e.g. 19.47666667 => £19.48
        it('should have correctly calculated the average current price of all products', () => {
            expect(averageProductPrice).to.eql('£19.48')
        })
    })

    describe('saveJsonFile static method', () => {
        // parameters: productData, filePath, fileName
        it('should return an error if productData contains no products', async () => {
            let productData = []
            expect(await Product.saveJsonFile(productData, '../output', 'ExampleFileName.json'))
            .to.eql('Error!: Could not save to file, no product data.')
        })

        it('should return an error if a filePath is not provided or is null', async () => {
            let productData = products
            expect(await Product.saveJsonFile(productData, '', 'ExampleFileName.json'))
            .to.eql('Error!: Could not save to file, no filePath provided.')
        })

        it('should return an error if a fileName is not provided or is null', async () => {
            let productData = products
            expect(await Product.saveJsonFile(productData, '../output', ''))
            .to.eql('Error!: Could not save to file, no fileName provided.')
        })
    })

})
