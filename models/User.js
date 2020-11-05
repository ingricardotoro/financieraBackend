const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

const userSchema = Schema({

    username: {
        type: String,
        trim: true,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: [true, 'El pasword es obligatorio']
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

//codigo para nNO retornar el password al usuario
usuarioSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}


userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('User', userSchema)