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

//funcion para crear nuevas Solicitudes
const createRequest = async(req, res) => {

    const {

        customerId,
        codeRequest,
        typeLoan,
        amount,
        rate,
        frequency,
        quota,
        quotaValue,
        totalInterest,
        closingCost,
        startDate,
        sucursal,
        details,
        stateRequest,
        createdBy,
        approvedBy,
        declinedBy

    } = req.body


    //creamos una instancia del objeto Persona
    newRequest = new Request({
        customerId,
        codeRequest,
        typeLoan,
        amount,
        rate,
        frequency,
        quota,
        quotaValue,
        totalInterest,
        closingCost,
        startDate,
        sucursal,
        details,
        stateRequest,
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

module.exports = { createRequest, listRequest, deleteRequest, updateRequest }