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





module.exports = cartRouter;