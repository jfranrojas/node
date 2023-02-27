const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const {Server} = require("socket.io");
const {getProducts, addProduct, deteleProductById} = require('./productManager');
const productRouter = require('./routes/product');
const productsRealTime = require('./routes/producsRealTime');
const server  = express();
const PORT = 8080

let products = [];
(async () => {
    products = await getProducts();
})();

server.engine('handlebars', handlebars.engine())
server.set('views', path.join(__dirname, "/../views"));
server.set('views engine', 'handlebars');

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, "/../public")));

server.use('api/products', productRouter)
server.use('api/products', productsRealTime)

server.get('/', async (req, res) =>{
    res.render('home', {products, title:"Home", style: 'index.css', PORT})
})

