const { Router } = require('express')
const cartRouter = Router()
const cartManager = require("../src/cartManager")
const managerCart = new cartManager("./entregables/cart.json")
const productManager = require("../src/productManager")

cartRouter.get('/:cid', async (req, res) => {

})

cartRouter.post('/', async (req, res) =>{
    try {
        await managerCart.CreateCart

    } catch (error) {
        res.status(500).send({error: error.message})
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = Number(req.params.cid);
        const productId = Number(req.params.pid)
        const findProduct = await productManager.getProductsById(productId)
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