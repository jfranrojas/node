const mongoDbProductContainer = require('../db/product.dao')
const productSchema = require('../db/model/product.js')
const productDAO = new mongoDbProductContainer('products', productSchema)

const serviceGetProducts = async () => {
    let getProducts = await productDAO.getProducts()
    return getProducts;
}

const serviceGetById = async () => {
    let getById = await productDAO.getById()
    return getById;
}

const serviceAddProducts = async () =>{
    let addProducts = await productDAO.addProducts(product)
    return addProducts;
}

const serviceUpdateProduct = async (id, product) => {
    let updateProduct = await productDAO.updateProduct(id, product)
    return updateProduct;
}

const serviceDeleteById = async (id) => {
    let deleteProduct = await productDAO.deleteProduct(id)
    return deleteProduct;
}

module.exports = {serviceAddProducts, serviceDeleteById, serviceGetById, serviceUpdateProduct, serviceGetProducts}