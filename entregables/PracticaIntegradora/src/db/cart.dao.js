const mongoose = require('mongoose');
require("dotenv").config();
const connection = process.env.db
const mongoDbProductContainer = require('./product.dao')
const productSchema = require('./model/product')
const productDAO = new mongoDbProductContainer('products', productSchema)

mongoose.connect(connection, error => {
    if(error){
        console.log('Cannot connect to database')
        process.exit()
    }
})
class mongoDbCartContainer {
    constructor(collection, schema){
        this.cartCollection = mongoose.model(collection, schema)
    }
    async getCarts(){
        try {
            const carts = await this.cartCollection.find()
            return carts
        } catch (error) {
            return {error: error.message}
        }
    }
    async getCartByid(id){
        try {
            const cartId = await this.cartCollection.findOne({_id: id})
            if(!cartId){
                return {error: `No existe un cart con un id ${id}`}
            }
            return cartId._id
        } catch (error) {
            if(error.name === 'CastError'){
                return {error: `id inválido: ${id}`}
            }
            return {error: error.message}
        }
    }
    async getProductsInCart(id){
            try {
                const cartId = await this.cartCollection.findOne({_id: id}).populate("products.product")
                if(!cartId){
                    return {error: `No existe un cart con un id: ${id}`}
                }
                const products = cartId.products
                return products
            } catch (error) {
                if(error.name === 'CastError'){
                    return {error: `id inválido: ${id}`}
            }
            return {error: error.message}
        }
    }
    async createCart(){
        try {
            const cart = new this.cartCollection()
            const addedCart = cart.save()
            return addedCart
        } catch (error) {
            return {error: error.message}
        }
    }
    async addProductInCart(id, productId){
        try {
            const cart = await this.cartCollection.findOne({_id: id})
            if(!cart){
                return {error: `No existe un cart con el id: ${id}`}
            }
            const productDetails = await productDAO.getById({_id: productId});

            if(!productDetails._id){
                return {error: `No existe un producto con el id: ${productId}`}
            }
            const productIndex = cart.products.findIndex(p=> String(p.id) === productId);
            if(productIndex >= 0){
                cart.products.push({products: productDetails._id})
            }
            const updatedCart = await cart.save();
            return updatedCart.products;
        } catch (error) {
            return {error: error.message}
        }   
    }

    async deleteCartById(id){
        try {
            const cartId = await this.cartCollection.findByIdAndRemove({_id: id})
            if(!cartId){
                return {error: `No existe un cart con el id: ${id}`}
            }
            return {eliminado : `El cart con id: ${id}, ha sido eliminado correctamente`}
        } catch (error) {
            if(error.name === 'CastError'){
                return { error: `Id invalido ----> ${id}`}
            }
            return {error: error.message}
        }
    }

    async deleteProductInCart(id, productId){
        try {
            const cart = await this.cartCollection.findOne({_id: id})
            if(!cart){
                return { error: `No existe un cart con el id: ${id}` }
            }
            const productDetails = await productDAO.getById({_id: productId});
            console.log(productDetails)
            if(!productDetails._id){
                return {error : `No existe un producto con el id: ${id}` }
            }
            const productIndex = cart.products.findIndex(p => String(p.product) === productId)
            console.log(productIndex)
            cart.products.splice(productIndex, 1)
            const updatedCart = await cart.save();
            return updatedCart.products;

        } catch (error) {
            return {error : error.message}
        }
    }

}

module.exports = mongoDbCartContainer;  