const mongoDbMessageContainer = require('../db/message.dao')
const messageSchema = require('../db/model/message.js')
const chatDAO = new mongoDbMessageContainer('message', messageSchema)

const getMessageServices = async () => {
    let response = await chatDAO.getAllMessages();
    return response;
}

const addMessageServices = async () => {
    let response = await chatDAO.createMessage(message)
    return response;
}


module.exports = {getMessageServices, addMessageServices}