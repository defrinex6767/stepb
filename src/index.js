var request = require('request');
var users = []
var orders = []
var products = []
var orderTracking = []


request('https://stepb.free.beeceptor.com/users',{json:true},(error,res,body) => {
        if(error) return console.log(error)
        console.log(JSON.parse(body))
})