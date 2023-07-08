const {
    getMessageServices,
    addMessageServices,
} = require("../services/message");

const getMessages = async () =>{
    const messages = await getMessageServices();
    return messages;
};

const addMessages = async (message) => {
    const result = await addMessageServices(message);
    return result;
};

module.exports = {getMessages, addMessages};