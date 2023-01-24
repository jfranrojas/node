const productManager = require("./entregable3/src/productManager")


const producto1 = {
    title: "Teclado ",
    description: "Mecánico y retroiluminado",
    price: 5000,
    thumbnail: 'http://',
    code: "ABC143",
    stock: 5,
}
const producto2 = {
    title: "Mouse Gamer",
    description: "Boton auxiliar y gamepad de regalo",
    price: 6000,
    thumbnail: 'http://',
    code: "ABC153",
    stock: 10,
}
const producto3 = {
    title: "Mouse Gamer",
    description: "Boton auxiliar y gamepad de regalo, inalambrico",
    price: 6000,
    thumbnail: 'http://',
    code: "ABC154",
    stock: 10,
}
const producto4 = {
    title: "Teclado Gamer",
    description: "Teclado mecánico",
    price: 6000,
    thumbnail: 'http://',
    code: "ABC155",
    stock: 10,
}
const reemplazo = {
    title: "producto Reemplazo",
    description: "A definir",
    price: 2000,
    thumbnail: 'http://',
    code: "ABC89",
    stock: 10,
}

const run = async () => {
    try{
    const products = new productManager("products.json")
    await products.addProduct(producto1)
    await products.addProduct(producto2)    
    await products.addProduct(producto3)
    await products.addProduct(producto4)
    console.log("primera consulta", await products.getProducts())
    // console.log("byId", await products.getProductsById(2))
    await products.updateProduct(2, reemplazo)
    console.log("segunda consulta", await products.getProducts())
    console.log("byId", await products.getProductsById(2))
    // await products.deleteProductById(2)
    // await products.deleteAll()    
    }
    catch{
        console.log("Algo no esta andando")
    }
}
run()