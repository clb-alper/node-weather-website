const request = require('request');

const tokenbalance = (address, callback) => {
    let balance;
    const url = 'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=0x8597ba143ac509189e89aab3ba28d661a5dd9830&address='+address+'&tag=latest&apikey=YA282RZFKAWKK2XNKW4G5BQNGC648USP9J'

    request({url, json:true}, (error, body) => {
        if(error){
            callback('Unable to connect metamask', undefined)
        }
        else {
            callback(undefined, 
                balance = body.body.result
            )
        }
    })
}

module.exports = tokenbalance;