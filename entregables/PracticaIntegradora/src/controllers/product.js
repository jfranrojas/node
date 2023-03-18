const {
    serviceAddProducts,
    serviceGetProducts,
    serviceGetById,
    serviceUpdateProduct,
    serviceDeleteById
} = require('../services/product.js')

const getProducts = async (req, res) => {
    const {limit} = req.query
    let products = await serviceGetProducts();
    if(!limit){
        res.render('homeProducts',{
            style: "index.css",
            title: "Home",
            products
        });
    }
    else {
        let limitedProducts = products.slice(0, limit)
        res.render('homeProducts',{
            style:"index.css",
            title:"Home",
            products: limitedProducts
        }
        );
    }
}
const getProductById = async (req, res) => {
    const id = req.params.pid
    let product = await serviceGetById(id)
    res.render("detailProduct", {
        style: "style.css",
        title: "Home",
        product
    });
}

const addProduct = async (req, res) => {
    const productAdded = await serviceAddProducts(req.body)
    res.send(productAdded)
}

const updateProductById = async (req, res) => {
    const id = req.params.pid
    let updateProduct = await serviceUpdateProduct(id, req.body)
    res.send(updateProduct)
}
const deleteById = async (req, res) => {
    const id = req.params.pid
    const deletedProduct = serviceDeleteById(id);
    res.send(deletedProduct)
}

module.exports = { addProduct, getProducts, getProductById, updateProductById, deleteById}

