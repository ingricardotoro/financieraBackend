const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const loansSchema = Schema({

    codeLoan: {
        type: Number,
        required: [true, 'El Codigo del prestamo es obligatorio'],
    },
    requestId: {
        type: Schema.Types.ObjectId,
        ref: 'Request',
        required: [true, 'El id de la Solicitud es obligatorio'],
    },
    amountInitial: {
        type: Number,
        required: [true, 'El Capital inicial del prestamo es obligatorio'],
    },
    totalToPay: {
        type: Number,
        required: [true, 'El Monto total a pagar del prestamo es obligatorio'],
    },
    amountPayed: {
        type: Number,
        default: 0
    },
    interesPayed: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    vencido: {
        type: Number,
        default: 0
    },
    mora: {
        type: Number,
        default: 0
    },
    otherPayed: {
        type: Number,
        default: 0
    },
    dateaproved: {
        type: Date,
        required: [true, 'La Fecha de Aprobacion es obligatorio'],
    },
    datefinish: {
        type: Date,
    },
    LoanActive: {
        type: Boolean,
        default: true
    },
    Enmora: {
        type: Boolean,
        default: false
    },

}, { timestamps: true })

loansSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Loan', loansSchema)