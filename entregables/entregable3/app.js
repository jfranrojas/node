const express = require('express')
const productManager = require("./productManager")
const manager = new productManager();
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = 8080;


app.get('/', (req, res) => {
    res.send('INVITAME UNA BIRRA')
})

app.get('/products', (req, res) => {
    res.send('INVITAME UNA BIRRA')
})





const server = app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`))
server.on('error', error =>  console.log(error))