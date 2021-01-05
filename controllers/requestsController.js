const Request = require('../models/Request')
    //const Contact = require('../models/request')

//funcion para listar todos los clientes
const listRequest = async(req, res) => {

    await Request.find({})
        //.populate('personid')
        .exec(function(err, requests) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Solicitudes",
                requests
            })

            console.log(requests);
        });
}

//Funcion para obtener el ultimo valor de codigo 
const lastCodeRequest = async(req, res) => {

    await Request.find({})
        .sort({ "codeRequest": -1 })
        .limit(1)
        .exec(function(err, lastCode) {

            let maxCode = 0
            if (lastCode[0] === undefined) { //en caso de ser el primer codigo
                maxCode = 0
            } else [
                maxCode = lastCode[0].codeRequest
            ]

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Ultimo Valor del Codigo de Solicitudes",
                lastCode: maxCode
            })

            console.log(maxCode);
        });

}

//funcion para crear nuevas Solicitudes
const createRequest = async(req, res) => {

    const {

        customerId,
        codeRequest,
        typeLoan,
        tipoCalculo,
        amount,
        rate,
        frequency,
        tipotasa,
        tipoInteres,
        quota,
        quotaValue,
        totalInterest,
        closingCostVar,
        totalAmount,
        datestart,
        sucursal,
        details,
        stateRequest,
        refName1,
        refPhone1,
        refRelation1,
        refName2,
        refPhone2,
        refRelation2,
        aval1Id,
        aval2Id,
        typeWarranty,
        modelo,
        marca,
        serie,
        anioDeGarantia,
        precioCompra,
        precioMercado,
        obsDeGarantia,
        createdBy,
        approvedBy,
        declinedBy

    } = req.body


    //creamos una instancia del objeto Persona
    newRequest = new Request({
        customerId,
        codeRequest,
        typeLoan,
        tipoCalculo,
        amount,
        rate,
        frequency,
        tipotasa,
        tipoInteres,
        quota,
        quotaValue,
        totalInterest,
        closingCostVar,
        totalAmount,
        datestart,
        sucursal,
        details,
        stateRequest,
        refName1,
        refPhone1,
        refRelation1,
        refName2,
        refPhone2,
        refRelation2,
        aval1Id,
        aval2Id,
        typeWarranty,
        modelo,
        marca,
        serie,
        anioDeGarantia,
        precioCompra,
        precioMercado,
        obsDeGarantia,
        createdBy,
        approvedBy,
        declinedBy
    })

    try {

        if (await newRequest.save()) {

            //Cliente creado exitosamente
            res.status(201).json({
                ok: true,
                msg: 'Solicitud creada exitosamente',
                newRequest
            })
        } else {
            res.status(500).json({
                ok: false,
                msg: "Error creating New Request"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating New Request-A",
            errro: error
        })
    }

}

const deleteRequest = async(req, res) => {

}

const updateRequest = async(req, res) => {

}

module.exports = { createRequest, listRequest, deleteRequest, updateRequest, lastCodeRequest }