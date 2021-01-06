const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const paymentSchema = Schema({

    loanId: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: [true, 'El id del Prestamo es obligatorio'],
    },
    dateToPay: {
        type: Date,
        required: [true, 'La Fecha del Pago es obligatorio'],
    },
    amountToPayed: {
        type: Number,
        required: [true, 'El Capital inicial del prestamo es obligatorio'],
    },
    amountToCapital: {
        type: Number,
        required: [true, 'La cantidad a Capital del pago es obligatorio'],
    },
    amountToInteres: {
        type: Number,
        required: [true, 'La cantidad a Intereses del pago es obligatorio'],
    },
    amountToMora: {
        type: Number,
        default: 0
    },
    otherPay: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    amountPayed: {
        type: Number,
        default: 0
    },
    datePayed: {
        type: Date,
    },
    methodPayed: {
        type: Number,
        default: 0
    },
    statusPay: {
        type: String,
        default: "Pendiente" //Pendiente, Pagada, Atrasada
    },
    Promise: {
        type: String,
    },

}, { timestamps: true })

paymentSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Payment', paymentSchema)