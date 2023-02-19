const axios = require('axios')
const cheerio = require('cheerio')

const axiosScraper = function(url) {
    axios.get('https://cdn.adimo.co/clients/Adimo/test/index.html')
    .then(function(response) {
        // HTML is inside response.data
        let $ = cheerio.load(response.data)

        $('div.item').each(function(i, elem){

        })
    })
    .catch(function(error) {
        //Print error if any occured
        console.error('Error!: ', error.message)
    })
}

module.exports = axiosScraper
