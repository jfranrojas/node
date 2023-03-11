const { Schema, model } = require('mongoose')
const mongoDbMessageContainer = require('../db/message.dao')
const messageSchema = require('../db/model/message.js')
const chatDAO = new mongoDbMessageContainer('message', messageSchema)

const getMessageServices = async () => {
    let response = await chatDAO.getAllMessages(message);
    return response;
}

const addMessageService = async () => {
    let response = await chatDAO.createMessage(message)
    return response;
}


module.exports = {getMessageServices, addMessageService}