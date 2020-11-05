const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const requestSchema = Schema({

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'El id del cliente es obligatorio'],
    },
    codeRequest: {
        type: String,
        trim: true,
        /*: [true, 'El codigo del cliente es obligatorio'],
        unique: true*/
    },
    typeLoan: {
        type: String,
        trim: true,
        required: [true, 'El tipo de prestamos es obligatorio']
    },

    amount: {
        type: Number,
        required: [true, 'El Monto del prestamo es obligatorio'],
    },

    rate: {
        type: Number,
        required: [true, 'La tasa de interes del prestamos es obligatoria']
    },
    frequency: {
        type: String,
        trim: true,
        required: [true, 'La Frecuencia de pago es obligatoria'],
    },
    quota: {
        type: Number,
        required: [true, 'La couta es obligatoria'],
    },
    totalInterest: {
        type: Number,
        required: [true, 'El Total de interes es obligatorio'],
    },
    closingCost: {
        type: Number,
        required: [true, 'El costo de cierre es obligatorio'],
    },
    startDate: {
        type: Date,
        required: [true, 'La Fecha de Inicio es obligatorio'],
    },
    sucursal: {
        type: String,
        trim: true,
        required: [true, 'La Sucursal es obligatoria']
    },
    details: {
        type: String,
        trim: true,
    },
    stateRequest: {
        type: String,
        trim: true,
        default: "Pendiente"
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del empleado es obligatorio'],
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del empleado es obligatorio'],
    },
    declinedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del empleado es obligatorio'],
    },

}, { timestamps: true })

requestSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Customer', requestSchema)