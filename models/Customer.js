const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = Schema({

    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id de la persona es obligatorio'],
    },
    numCustomer: {
        type: Number,
        trim: true,
        required: [true, 'El numero del cliente es obligatorio'],
        unique: true
    },
    codeCustomer: {
        type: String,
        trim: true,
        required: [true, 'El codigo del cliente es obligatorio'],
        unique: true
    },
    balance: {
        type: Number,
        trim: true,
        default: 0.0
    },
    LoanActive: {
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