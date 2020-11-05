const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = Schema({

    /*personid: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id de la persona es obligatorio'],
    },*/
    codeCustomer: {
        type: String,
        trim: true,
        required: [true, 'El codigo del cliente es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'El nombre del cliente es obligatorio']
    },

    lastname: {
        type: String,
        trim: true,
        required: [true, 'El apellido de cliente es obligatorio'],
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
        trim: true,
    },
    fec_nac: {
        type: Date,
    },
    phone1: {
        type: String,
        trim: true,
        required: [true, 'El relefono del cliente es obligatorio'],
    },
    phone2: {
        type: String,
        trim: true,
    },
    email1: {
        type: String,
        trim: true,
    },
    email2: {
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
    Loanctive: {
        type: Boolean,
        default: false
    },
    defaulter: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

customerSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Customer', customerSchema)