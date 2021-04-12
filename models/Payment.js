const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const paymentSchema = Schema({

    loanId: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: [true, 'El id del payment es obligatorio'],
    },
    code: {
        type: Number,
        required: [true, 'El code del payment es obligatorio'],
    },
    dateToPay: {
        type: Date,
        required: [true, 'La Fecha del Pago es obligatorio'],
    },
    amountToPay: {
        type: Number,
        required: [true, 'La cuota del payment es obligatorio'],
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
        type: String,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    inFavor: {
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