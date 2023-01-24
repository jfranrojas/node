const express = require('express')
const productManager = require('./productManager')
const app = express()
const PORT = 8080;
const manager = new productManager("entregables/products.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/', (req, res) => {
    res.send('Entregable 3, express')
})

app.get('/products', async (req, res) => {
    try{
        const {limit} = req.query
        const getProducts = await manager.getProducts()
        if(!limit){
            res.send(getProducts)
        }
        else{
            const getLimit = getProducts.slice(0, getLimit)
            res.send(getProducts)
        }
    }
    catch{  
        res.stutes(500).send({status:"error", error:"Error de servidor"})

    }
})
app.get('/product/:pid', async (req, res) =>{
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





const server = app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
server.on('error', error =>  console.log(error))