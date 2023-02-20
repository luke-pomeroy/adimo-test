const puppeteer = require('puppeteer')
const Product = require('./class/product')

const isShowMoreVisible = async (page, cssSelector) => {
    let visible = true

    await page
      .waitForSelector(cssSelector, { visible: true, timeout: 2000})
      .catch(() => {
        visible = false
      })

    return visible
}

const puppeteerScraper = async (url) => {
    if (!url) {
        return { error: 'Error!: a url must be provided.' }
    }
    
    const browser = await puppeteer.launch({ headless: true})

    try {
        const page = await browser.newPage()

        // Intercept image requests to improve time to completion
        await page.setRequestInterception(true)
        page.on('request', req => {
        if (req.url().endsWith('.jpg')) {
            req.abort()
        }
        else {
            req.continue()
        }
        })
        await page.goto(url, {waitUntil: 'networkidle2'})

        await page.waitForSelector('[data-tid="banner-accept"]', { timeout: 5000 })
        .then((cookieButton) => {
            cookieButton.click()
        })
        .catch(() => {})

        const selectorForShowMoreButton = '#content > section.pagination-bar.pagination-bar--new > div.pagination-bar__section.pagination-bar__section--paging.js-pagination-bar__section--paging > nav > a'
        let showMoreVisible = await isShowMoreVisible(page, selectorForShowMoreButton)

        while (showMoreVisible) {
        await page.waitForNavigation({waitUntil: 'networkidle2'})
        await page
            .click(selectorForShowMoreButton)
            .catch(() => {})
        showMoreVisible = await isShowMoreVisible(page, selectorForShowMoreButton)
        }

        const items = await page.evaluate((Product) => {
            const itemList = document.querySelectorAll(".product-grid__item")
            let results = []

            itemList.forEach(item => {
                let result = {
                    title: item.querySelector(".product-card__name").innerText,
                    imageUrl: item.querySelector(".product-card__image-container > img").getAttribute("src"),
                    currentPrice: item.querySelector(".product-card__price").innerText
                }
                results.push(result)
            })

            return results
        })

        const products = items.map(item => {
            item = new Product(
                title = item['title'],
                imageUrl = item['imageUrl'],
                currentPrice = item['currentPrice'],
                previousPrice = ''
            )
            return item
        })

        return { products: products }

    } catch (error) {
        return { error: 'Error!: ' + error.message }
    } finally {
        await browser.close()
    }
}

module.exports = puppeteerScraper
