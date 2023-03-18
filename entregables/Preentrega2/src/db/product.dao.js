const mongoose = require ('mongoose');
require("dotenv").config;
const connection = process.env.db
mongoose.connect(connection, error =>{
    if(error){
        console.log('Cannot connect to db')
        process.exit()
    }
})

class mongoDbProductContainer {
    constructor(collection, schema){
        this.productCollection = mongoose.model(collection, schema)
    }
    async getProducts(){
        try {
            const allProducts = await this.productCollection.find().lean()
            return allProducts
        } catch (error) {
            return {error: error.message}
        }
    }
    async getById(id){
        try {
            const product = await this.productCollection.findOne({_id:id}).lean()
            if(!product){
                return {error: `No existe un producto con el id: ${id}`}
            }
            return product
        } catch (error) {
            if(err.name === 'CastError'){
                return {error: `Id invalido ${id}`}
            }
            return {error: error.message}
        }
    }
    async addProduct(product){
        try {
            const newProduct = new this.productCollection(product)
            const validationError = newProduct.validateSync()
                if(validationError){
                    const errorMessages = []
                    for(let errorField in validationError.errors){
                        const errorMessage = validationError.errors[errorField].message
                        errorMessage.push(errorMessage)
                    }
                    return {error: errorMessages}
                }
                const createdProduct = await newProduct.save()
                return createdProduct
        } catch (error) {
            return {error: error.message}
        }
    }
    async updateProduct(id, product){
        try {
            const updateProduct = await this.productCollection.findByIdAndUpdate(
                {_id: id},
                product,
                {new: true}
            )
            if(!updateProduct){
                return {error: `No existe un producto con el id: ${id}`}
            }
            return {Modificado: `El producto con el id: ${id} fue modificado correctamente`}
        } catch (error) {
            if(error.name === 'CastError'){
                return {error: `Id invalido ------> ${id}, coloca un id válido`}
            }
            return {error: error.message}
        }
    }
    async deleteById(id){
        try {
            const deleteProduct = await this.productCollection.deleteOne({_id : id})
            if(deleteProduct.deletedCount === 0){
                return {error: `No existe un producto con el id: ${id}`}
            }
            const deletedProduct = {Eliminado: `El producto con el id ---> ${id}, ha sido eliminado correctamente`}
            return deletedProduct
        } catch (error) {
            if(error.name === 'CastError'){
                return {error: `Id invalido -----> ${id}`}
            }
            return{error: error.message}
        }
    }
}

module.export = mongoDbProductContainer; 