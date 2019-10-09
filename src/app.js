const express = require('express');
const server = express();
const usersLib = require('../data/users');
const ordersLib = require('../data/orders');
const ordersTrackingLib = require('../data/OrderTracking');
const productsLib = require('../data/products');
const companyLib = require('../data/company');
const users = usersLib();
const companies = companyLib()
const orders = ordersLib();
const ordersTracking = ordersTrackingLib();
const products = productsLib();

server.get('/user', (req, res) => {
    res.send(users);
});

var bodyParser = require('body-parser');
server.use(express.urlencoded())
server.use(bodyParser())


const purchase = (userId, asd, options) => {
    const user = users.find((element) => element.id == userId)
    if (user) {
        let company = undefined
        if (user.type === 'kurumsal') {
            company = user.company
        }
        const usersProducts = user.selectedProducts;
        const productList = products.filter((element) => usersProducts.includes(element.id))
        let hata2 = false;
        productList.map((element) => {
            if (element.stockCount === 0) {
                hata2 = true;
                console.log('hata2')
            }
            else if (element.price === 0) {
                ordersTracking.push({ userId: userId, productId: element.id, processDate: Date.now().toString() })
                element.stockCount--
            }
            else if (element.stockCount !== 0) {
                orders.push({ userId: userId, productId: element.id, amount: 1 });
                element.stockCount--
            }
        });
        if (!hata2)
            console.log(ordersTracking)
    }
    else {
        console.log('hata 1')
    }
}

purchase(1, [1, 2, 3], null)

server.get('/user/:userid', (req, res) => {
    if (!req.params.userid) {
        res.send('Invalid user id');
    }
    else {
        let user = users.find((element) => element.id == req.params.userid)
        if (user)
            res.send(user);
        else
            res.send('User is not found')
    }
})

server.get('/calculate/fibonacci',(req,res) => {
    let a=1, b=0, temp = 0
    let num = 50000
    while(num >= 0){
       temp = a
       a = a+b
       b = a
       num-- 
    }
})

server.put('/product/:productId', (req, res) => {
    if (!req.params.productId) {
        res.send('Invalid product Id')
    }
    else {
        if (req.body.stockCount) {
            let product = products.find((element) => element.id == req.params.productId)
            if (product) {
                product.stockCount = parseInt(req.body.stockCount)
                res.send(product)
            }
            else {
                res.send('Product is not found')
            }
        }
        else {
            res.send('Stock Count must be require parameter')
        }
    }
})

server.post('/freeordertracking', (req, res) => {
    if (req.body.userId && req.body.productId) {
        ordersTracking.push({ userId: parseInt(req.body.userId), productId: parseInt(req.body.productId), processDate: Date.now().toString() })
        let product = products.find((element) => {
            return (element.id == req.body.productId)
        })
        product.stockCount--
        res.send('Added!')
    }
    else {
        res.send('Invalid input')
    }
})

server.post('/order', (req, res) => {
    if (req.body.userId && req.body.productId) {
        const userid = parseInt(req.body.userId)
        const productId = parseInt(req.body.productId)
        const amount = 1
        const user = users.find((element) => { return (userid == element.id) })
        if (user) {
            const address = user.company != null ? companies.find((element) => { return (user.company === element.companyName) }).deliveryAdress : user.delivery
            orders.push({ userId: userid, productId: productId, amount: amount, address: address })
            res.send('Succesfull')
            console.log(orders)
            console.log('log finished')
        }
        else {
            res.send('User is not exists')
        }
    }
    else {
        res.send('Invalid parameter')
    }
})


server.get('/product/:productId', (req, res) => {
    if (!req.params.productId) {
        res.send('Invalid product Id')
    }
    else {
        let product = products.find((element) => element.id == req.params.productId)
        if (product) {
            res.send(product)
        }
        else {
            res.send('Product is not found')
        }
    }
})

server.get('/product', (req, res) => {
    res.send(products)
})


server.listen(3000);