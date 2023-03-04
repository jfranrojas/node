const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    title: {type: String, required: [true, "El campo title es requerido"] },
    description : {type: String, required: [true, "El campo description es requerido"] },
    code: {type: String, required: [true, "El campo code es requerido"] },
    price: {type: Number, required: [true, "El campo price es requerido"] },
    status: {type: Boolean, default: true },
    stock: {type: Number, required: [true, "El campo stock es requerido"] },
    category: {type: String, required: [true, "El campo category es requerido"] },
    thumbnail: {type: String, required: [true, "El campo thumbnail es requerido"] },
},
{
    versionKey: false,
})
module.exports = productSchema