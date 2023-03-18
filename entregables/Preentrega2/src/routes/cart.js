const {Router} = require('express')
const cartRouter = Router();
const {
    getCarts,
    createCart,
    getProductsInCart,
    deleteCart,
    addProductInCart,
    deleteProductInCart,
} = require('../controllers/cart.js')

cartRouter.get('/', getCarts)
cartRouter.post('/', createCart)
cartRouter.get('/:cid', getProductsInCart)
cartRouter.delete('/:cid', deleteCart)
cartRouter.delete('/:cid/product/:pid', deleteProductInCart)
cartRouter.post('/:cid/product/:pid', addProductInCart)

module.exports = cartRouter


