const {
    getMessageServices,
    addMessageService,
} = require('../services/messages');

const getMessages = async () =>{
    const messages = await getMessageServices();
    return messages;
};

const addMessages = async (message) => {
    
    const result = await addMessageService(message);
    return result;
};

module.exports = {getMessages, addMessages};