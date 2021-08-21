const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const requestSchema = Schema({

    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'El id del cliente es obligatorio'],
    },
    codeRequest: {
        type: Number,
        trim: true,
        required: [true, 'El codigo del Solicitud es obligatorio'],
        unique: true
    },
    typeLoan: {
        type: String,
        trim: true,
        required: [true, 'El tipo de prestamos es obligatorio']
    },
    tipoCalculo: { // para determinar si sera por numero de cuotas o por valor de cuotas
        type: String,
        trim: true,
        required: [true, 'El tipo de calculo es obligatorio (numero o valor de cuota)']
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
    tipotasa: {
        type: String,
        trim: true,
        required: [true, 'El tipo de tasa es obligatoria'],
    },
    tipoInteres: {
        type: String,
        trim: true,
        required: [true, 'La Frecuencia de pago es obligatoria'],
    },
    quota: {
        type: Number,
        required: [true, 'La couta es obligatoria'],
    },
    quotaValue: {
        type: Number,
        required: [true, 'El Valor de la cuota es obligatoria'],
    },
    totalInterest: {
        type: Number,
        required: [true, 'El Total de interes es obligatorio'],
    },
    closingCostVar: {
        type: Number,
        required: [true, 'El costo de cierre es obligatorio'],
    },
    totalAmount: {
        type: Number,
        required: [true, 'El TotalAmoung es obligatorio'],
    },
    datestart: {
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
        required: [true, 'El estado de la solicitud es obligatoria'],
        default: "Pendiente"
    },
    refName1: {
        type: String,
        trim: true,
    },
    refPhone1: {
        type: String,
        trim: true,
    },
    refRelation1: {
        type: String,
        trim: true,
    },
    refName2: {
        type: String,
        trim: true,
    },
    refPhone2: {
        type: String,
        trim: true,
    },
    refRelation2: {
        type: String,
        trim: true,
    },
    aval1Id: {
        type: Schema.Types.ObjectId,
        ref: 'Aval',
        required: false,
    },
    aval2Id: {
        type: Schema.Types.ObjectId,
        ref: 'Aval',
        required: false
    },
    typeWarranty: {
        type: String,
        trim: true,
    },
    modelo: {
        type: String,
        trim: true,
    },
    marca: {
        type: String,
        trim: true,
    },
    serie: {
        type: String,
        trim: true,
    },
    anioDeGarantia: {
        type: String,
        trim: true,
    },
    precioCompra: {
        type: Number,
        trim: true,
    },
    precioMercado: {
        type: Number,
        trim: true,
    },
    obsDeGarantia: {
        type: String,
        trim: true,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    declinedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

}, { timestamps: true })

requestSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Request', requestSchema)