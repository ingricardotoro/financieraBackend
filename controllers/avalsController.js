const Aval = require('../models/Aval')
const Person = require('../models/Person')

//funcion para listar todos los avales
const listAval = async(req, res) => {

    await Aval.find({})
        .populate('personId')
        .exec(function(err, avals) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Avales",
                avals
            })

        });
}

//Funcion para realizar busqueda mediante ID
const findAvalById = async(req, res) => {

    let id = req.params.id

    await Aval.findById(id)
        .populate('personId')
        .exec(function(err, aval) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Aval Encontrado",
                aval
            })

        });
}

//Funcion para realizar busqueda mediante Name
const listAvalByName = async(req, res) => {

}

//Funcion para buscar el ultimo codigo utilizado
const lastCodeAval = async(req, res) => {

    await Aval.find({}, 'numAval').sort({ numAval: -1 }).limit(1)
        .exec(function(err, LastCode) {
            //en caso de obtener un error en la Busqueda

            console.log("LastCode=" + JSON.stringify(LastCode.length))
                //if (LastCode.length === 0) { LastCode = 0 }
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Ultimo Codigo",
                LastCode
            })

        });

}

//funcion para crear nuevos Avales
const createAval = async(req, res) => {

    const {
        //personid,
        name,
        lastname,
        identidad,
        gender,
        rtn,
        fec_nac,
        phone1,
        phone2,
        email1,
        email2,
        city,
        location,
        profesion,
        numAval,
        codeAval,

    } = req.body

    //EN CASO DE SER UNA NUEVA PERSONA

    try {
        //creamos una instancia del objeto Persona
        newPerson = new Person({
            name,
            lastname,
            identidad,
            gender,
            rtn,
            fec_nac,
            phone1,
            phone2,
            email1,
            email2,
            city,
            location,
            profesion,
        })

        //guardamos el usuario en la base de datos
        if (await newPerson.save()) {

            try {

                newAval = new Aval({
                    codeAval,
                    numAval,
                    personId: newPerson._id,
                })

                try {
                    if (newAval.save()) {

                        res.status(201).json({
                            ok: true,
                            msg: 'Aval creado exitosamente',
                            newPerson,
                            newAval
                        })
                    } else {
                        res.status(500).json({
                            ok: false,
                            msg: 'Error Creando Nuevo Aval',
                        })
                    }
                } catch (error) {
                    console.log("NUEVO ERROR:")
                    console.log(error)
                }


            } catch (error) {
                console.log(error)
                res.status(500).json({
                    ok: false,
                    msg: "Error creating New Aval"
                })
            }

        }

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error creating New Person"
        })
    }

}

const deleteAval = async(req, res) => {

    let id = req.params.id
    await Aval.findByIdAndRemove(id, (err, customerDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun Aval a eliminar
        if (!customerDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id del aval no existe'
                }
            })
        }

        //en caso que el aval ha sido eliminado
        res.status(200).json({
            ok: true,
            message: "Aval Eliminado Exitosamente"
        })
    })
}

const updateAval = async(req, res) => {

}

//Funcion para cambiar el estado del aval
const updateActiveAval = async(req, res) => {

    let id = req.params.id

    try {

        await Aval.findByIdAndUpdate(id, { active: req.body.active }, {
            new: true, //devuelve el objeto actualizado
        }, (err, avalDB) => {

            //en caso de tener algun error en save()
            if (err) {
                console.log("ERRORASO");
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            //evaluaremos si NO se modifico el cliente
            if (!avalDB) {
                res.status(500).json({
                    ok: false,
                    err
                })
            }

            //en caso de que Si se actualizo el empleado
            res.status(200).json({
                ok: true,
                msj: "Estado Actualizado Exitosamente",
            })

        })
    } catch {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando el Estaod del Aval"
        })
    }
}

module.exports = { findAvalById, createAval, listAval, deleteAval, updateAval, listAvalByName, lastCodeAval, updateActiveAval }