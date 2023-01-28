const { Router } = require('express')
const productsRouter = Router()

const productManager = require("../src/productManager");
const manager = new productManager("./entregables/products.json")

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const getProducts = await manager.getProducts()
        if (!limit) {
            res.send(getProducts)
        }
        else {
            const getLimit = getProducts.slice(0, getLimit)
            res.send(getProducts)
        }
    }
    catch {
        res.stutes(500).send({ status: "error", error: "Error de servidor" })

    }
})

productsRouter.get('/:bid', async (req, res) =>{
    try{
        const id = Number(req.params.pid)
        const productId = await manager.getProductsById(id)
        if(!productId){
            res.status(400).send({status:"NOT FOUND", error:"EL ID BUSCADO NO EXISTE"})
        }
        else{
            res.send(productId)
        }
    }
    catch{
        res.stutes(500).send({status:"ERROR",error:"ALGO ANDA MAL"})
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const newProduct = await manager.addProduct(req.body);
        if(newProduct === "Error"){
            res.send({error: "Faltan datos de tu producto 😒"})
        }
        else{
            res.send(`Producto:${req.body.title} agregado 👌`)
        } 
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})
productsRouter.put('/:bid', async (req,res) => {
    try {
        const id = Number(req.params.bid)
        const productUpdate = req.body
        await manager.updateProduct(id, productUpdate);
        res.send(`Id: ${productUpdate.id} actualizado correctamente 👍 `)
    }
    catch (err) {
        req.status(500).send({error:err.message})
    }
})
productsRouter.delete('/:bid', async (req, res) => {
    try {
        const id = Number(req.params.bid)
        await manager.deleteProductById(id)
        res.send(`Producto con id: ${id} eliminado correctamente ❌`)
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
})

module.exports = productsRouter;