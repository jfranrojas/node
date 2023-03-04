const mongoose = require ('mongoose');
require ("dotenv").config();
const connection = process.env.db
mongoose.connect(connection, error =>{
    if(error){
        console.log("cannot connect to db");
        process.exit()
    }
})

class mongoDbMessageContainer {

    constructor(collection, schema){
        this.messageCollection = mongoose.model(collection, schema)
    }
    async getAllMessages(){
        let messages = await this.messageCollection.find().lean();
        return messages;
    }
    async createMessage(message){
        try {
            const newProduct = new this.messageCollection(message)
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
            return{error: error.message}
        }
    }
}

module.exports  = mongoDbMessageContainer;
