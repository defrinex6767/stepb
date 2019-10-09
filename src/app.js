const express = require('express');
const server = express();
const usersLib = require('.data/users');
const ordersLib = require('.data/orders');
const ordersTrackingLib = require('.data/OrderTracking');
const productsLib = require('.data/products');
const users = usersLib();
const orders = ordersLib();
const ordersTraciking = ordersTrackingLib();
const products = productsLib();

server.get('/user', (req,res) => {
    res.send(users);
});

server.listen(3000);