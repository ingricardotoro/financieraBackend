const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = Schema({

    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id de la persona es obligatorio'],
    },
    codeCustomer: {
        type: Number,
        trim: true,
        required: [true, 'El codigo del cliente es obligatorio'],
        unique: true
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