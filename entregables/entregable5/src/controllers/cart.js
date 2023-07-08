const {
    serviceAddCart,
    serviceGetProductsInCart,
    serviceAddCartProduct,
    serviceDeleteCart,
    serviceGetCarts,
    serviceDeleteCartProduct,
    updateQuantityProductService,
} = require ('../services/cart')

const getCarts = async (req, res) => {
    const carts = await serviceGetCarts()
    res.send(carts)
}

const createCart = async (req, res) => {
    const cartAdded = await serviceAddCart()
    res.send(cartAdded)
} 

const getProductsInCart = async (req, res) => {
    const productsInCart = await serviceGetProductsInCart(req.params.cid)
    res.sen(productsInCart)
}

const deleteCart = async (req, res) => {
    const cartRemoved = await serviceDeleteCart(req.params.cid)
    res.send(cartRemoved)
}

const addProductInCart = async (req, res) => {
    const addProduct = await serviceAddCartProduct(req.params.cid, req.params.pid)
    res.send(addProduct)
}

const deleteProductInCart = async (req, res) => {
    const deleteProduct = await serviceDeleteCartProduct(req.params.cid, req.params.pid)
    res.send(deleteProduct)
}

const updateQuantityProduct = async (req, res) => {
    const result = await updateQuantityProductService(req.params, req.body);
    res.send(result);
}

module.exports = {getCarts, createCart, getProductsInCart,  deleteCart, addProductInCart, deleteProductInCart, updateQuantityProduct}