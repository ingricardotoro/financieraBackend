const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const personSchema = Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre del usuario es obligatorio']
    },

    lastname: {
        type: String,
        trim: true,
        required: [true, 'El apellido de usuario es obligatorio'],
    },

    identidad: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'El número de identidad es obligatorio']
    },
    rtn: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        trim: true,
        required: [true, 'El género es obligatorio'],
    },
    photo: {
        type: String,
    },
    fec_nac: {
        type: Date,
    },
    phone1: {
        type: String,
        trim: true,
        required: [true, 'El id de la persona es obligatorio'],
    },
    phone2: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },

}, { timestamps: true })

personSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Person', personSchema)