const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const avalSchema = Schema({

    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'El id de la persona es obligatorio'],
    },
    codeAval: {
        type: Number,
        trim: true,
        required: [true, 'El codigo del Aval es obligatorio'],
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },

}, { timestamps: true })

avalSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = model('Aval', avalSchema)