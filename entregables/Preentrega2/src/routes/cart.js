const {Router} = require('express')
const cartRouter = Router();
const {
    getcarts,
    createCart,
    getProductsInCart,
    deleteCart,
    addProductInCart,
    deleteProductInCart,
} = require('../controllers/cart')

cartRouter.get('/', getcarts)
cartRouter.post('/', createCart)
cartRouter.get('/:cid', getProductsInCart)
cartRouter.delete('/:cid', deleteCart)
cartRouter.delete('/:cid/product/:pid', deleteProductInCart)
cartRouter.post('/:cid/product/:pid', addProductInCart)

module.exports = cartRouter


