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
class mongoDbProductContainer {
    constructor(collection, schema){
        this.cartCollection = mongoose.model(collection, schema)
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
            
    }
}