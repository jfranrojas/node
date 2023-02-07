// #region IMPORTS
const express = require('express')
// #endregion
// #region DECLARATIONS 
const app = express()
const productsRouter = require('../routes/products')
const cartRouter = require("../routes/cart")

const PORT = 8080
// #endregion

//#region Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)


app.get('/', (req, res) =>{
    res.send("Esta es mi primer Pre entrega")
})
// #endregion

const server = app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
server.on("error", error => console.log(error))



