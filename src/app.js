const express = require('express');
const server = express();
const usersLib = require('../data/users');
const ordersLib = require('../data/orders');
const ordersTrackingLib = require('../data/OrderTracking');
const productsLib = require('../data/products');
const users = usersLib();
const orders = ordersLib();
const ordersTracking = ordersTrackingLib();
const products = productsLib();

server.get('/user', (req,res) => {
    res.send(users);
});

const purchase = (userId,asd, options) => {
    const user = users.find((element) => element.id == userId)
    if(user){
    let company = undefined
    if(user.type === 'kurumsal'){
        company = user.company
    }
    const usersProducts = user.selectedProducts;
    const productList = products.filter((element) => usersProducts.includes(element.id))
    let hata2 = false;
    productList.map((element) => {
        if(element.stockCount === 0){
            hata2 = true;
            console.log('hata2')
        }
        else if(element.price === 0){
            ordersTracking.push({userId:userId,productId:element.id,processDate:Date.now().toString()})
            element.stockCount--
        }
        else if(element.stockCount !== 0){
            orders.push({userId:userId,productId:element.id,amount:1});
            element.stockCount--
        }
    });
    if(!hata2)
        console.log(ordersTracking)
    }  
    else{
        console.log('hata 1')
    }
}

purchase(1,[1,2,3],null)

server.get('/user/:userid',(req,res) => {
    if(!req.params.userid) {
        res.send('Invalid user id');
    }
    else {
        let user = users.find((element) => element.id == req.params.userid)
        if(user.type === 'kurumsal'){
            user = user.company
        }
        res.send(user);
    }
})

server.post('/user',(req,res) => {
    
})

server.listen(3000);