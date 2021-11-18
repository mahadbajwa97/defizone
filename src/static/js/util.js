const fetch = require('node-fetch');
const fs = require('fs');

const lookUpTokenPrices = async function(id_array) {
    let ids = id_array.join('%2C')
    const url = 'https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + ids + '&vs_currencies=usd'
    const res = await fetch(url);
    const text = await res.text();
    return JSON.parse(text);
}
function updateBanner(output) {
    const content = JSON.stringify(output);
    
    fs.writeFile('/banner.json', content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    
        return "The file was saved!";
    });
}

function getParameterCaseInsensitive(object, key) {
    return object[Object.keys(object)
        .find(k => k.toLowerCase() === key.toLowerCase())
    ];
}




module.exports = { lookUpTokenPrices, getParameterCaseInsensitive,updateBanner };