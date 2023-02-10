const { Router } = require('express')
const cartRouter = Router()
const cartManager = require("../src/cartManager")
const managerCart = new cartManager("./entregables/cart.json")
const productManager = require("../src/productManager")
const managerProduct = new productManager("./entregables/product.json")

cartRouter.get('/:cid', async (req, res) => {
    const id = Number(req.params.cid)
    const productsInCart = await managerCart.getProductsInCart(id)
    res.send(productsInCart)
})

cartRouter.post('/', async (req, res) =>{
    try {
        await managerCart.CreateCart();
        res.send("Cart created successfully")

    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = Number(req.params.cid);
        const productId = Number(req.params.pid)
        const findProduct = await managerProduct.getProductsById(productId)
        if(!findProduct){
            res.status(404).send({error: "Product not found"})
        }
        else{
            await managerCart.addProductInCart(cartId, findProduct)
            res.send(`Producto con id: ${productId} agregado correctamente al carrito con id ${cartId}`)
        }
    } catch (error) {
        res.status(500).send({ error: err.message })
    }
})



module.exports = cartRouter;