const mongoose = require ("mongoose")
const { createHash } = require("../../utils/hashPassword");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Este usuario ya existe"],
        require: [true, "El campo usuario es requerido"],
    },
    email: {
        type: String,
        unique: [true, "Este mail ya existe"],
        required: [true, "El campo mail es requerido"],
    },
    password: {type: String, required: [true, "Ingresa una contraseña"]},
    rol: {
        type: String,
        default: "usuario"
    },
})

userSchema.pre("save", function (next){
    const user = this;
    console.log(this)
    if (user.email === "admin@coder.com" &&
        user.password === "admin123"){
            user.rol ="admin";
        }
        user.password = createHash(this.password);
        next();
});

module.exports = userSchema