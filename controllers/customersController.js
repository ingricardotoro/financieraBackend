const Customer = require('../models/Customer')
const Person = require('../models/Person')

//const Contact = require('../models/contact')

//funcion para listar todos los clientes
const listCustomer = async(req, res) => {

    await Customer.find({})
        .populate('personId')
        .exec(function(err, customers) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Lista de Clientes",
                customers
            })

        });
}

const findCustomerById = async(req, res) => {

    let id = req.params.id

    await Customer.findById(id)
        .populate('personId')
        .exec(function(err, customer) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Cliente Encontrado",
                customer
            })

        });
}

const listCustomerByName = async(req, res) => {

}

const lastCodeCustomer = async(req, res) => {

    await Customer.find({}, 'numCustomer').sort({ numCustomer: -1 }).limit(1)
        .exec(function(err, LastCode) {
            //en caso de obtener un error en la Busqueda
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json({
                ok: true,
                msg: "Ultimo Cliente",
                LastCode
            })

        });

}

//funcion para crear nuevos clientes
const createCustomer = async(req, res) => {

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
        codeCustomer,
        numCustomer,

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

                newCustomer = new Customer({
                    codeCustomer: 'C' + codeCustomer,
                    numCustomer,
                    personId: newPerson._id,
                })

                try {
                    if (newCustomer.save()) {

                        res.status(201).json({
                            ok: true,
                            msg: 'Cliente creado exitosamente',
                            newPerson,
                            newCustomer
                        })
                    } else {
                        res.status(500).json({
                            ok: false,
                            msg: 'Error Creando Nuevo Cliente',
                            newCustomer
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
                    msg: "Error creating New Customer"
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

const deleteCustomer = async(req, res) => {

    let id = req.params.id
    await Customer.findByIdAndRemove(id, (err, customerDB) => {

        //en caso de obtener un error en la eliminacion
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        //en caso que el id no exita, y no encuentre ningun cliente a eliminar
        if (!customerDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id del cliente no existe'
                }
            })
        }

        //en caso que el cliente ha sido eliminado
        res.status(200).json({
            ok: true,
            message: "Cliente Eliminado Exitosamente"
        })
    })
}

const updateCustomer = async(req, res) => {

    //let id = req.params.id //id del customer
    let body = req.body
    const personid = body.personId

    let updatePersona = {

        name: body.name,
        lastname: body.lastname,
        identidad: body.identidad,
        gender: body.gender,
        rtn: body.rtn,
        fec_nac: body.fec_nac,
        phone1: body.phone1,
        phone2: body.phone2,
        email1: body.email1,
        email2: body.email2,
        profesion: body.profesion,
        city: body.city,
        location: body.location,

    }

    try {

        Person.findByIdAndUpdate(personid, updatePersona, { new: true, runValidators: true },
            (err, personDB) => {

                //en caso de tener algun error en save()
                if (err) {
                    res.status(500).json({
                        ok: false,
                        err
                    })
                }

                //evaluaremos si NO se modifico el customer
                else if (!personDB) {
                    res.status(400).json({
                        ok: false,
                        err
                    })
                }

                //en caso de que Si se actualizo el customer
                res.status(200).json({
                    ok: true,
                    msj: "Customer Actualizado Exitosamente",
                    empleadoActualizado: personDB,
                    datosPersona: personDB
                })
            })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando Datos de Persona de Customer"
        })
    }



}

//Funcion para cambiar el estado del cliente
const updateActiveCustomer = async(req, res) => {

    let id = req.params.id

    try {

        await Customer.findByIdAndUpdate(id, { active: req.body.active }, {
            new: true, //devuelve el objeto actualizado
        }, (err, customerDB) => {

            //en caso de tener algun error en save()
            if (err) {
                console.log("ERRORASO");
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            //evaluaremos si NO se modifico el cliente
            if (!customerDB) {
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
            msg: "Error Actualizando el Estaod del Cliente"
        })
    }
}



const savePerson = async(customer) => {

    //const codeCustomer = customer[0]
    const name = customer[1]
    const lastname = customer[2]
    const identidad = customer[3]
    const rtn = customer[4]
    const gender = customer[5]
    const fec_nac = customer[6]
    const phone1 = customer[7]
    const phone2 = customer[8]
    const email1 = customer[9]
    const email2 = customer[10]
    const country = customer[11]
    const city = customer[12]
    const location = customer[13]
    const profesion = customer[14]

    //creamos una instancia del objeto Persona
    let newPerson = new Person({
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
        country,
        city,
        location,
        profesion,
    })

    if (await newPerson.save()) {
        return newPerson
    }

}

const saveCustomer = async(newPerson, codeCustomer) => {

    try {
        let newCustomer = new Customer({
            codeCustomer: 'C' + codeCustomer,
            numCustomer: codeCustomer,
            personId: newPerson._id,
        })
        if (await newCustomer.save()) {
            return newCustomer
        } else {
            console.log("Error creando nuevo usuario")
        }
    } catch (error) {
        console.log("ERROR CATCH:" + error)
    }




}

//funcion para subir archivo de excel de nuevos clientes
const uploadCustomer = async(req, res) => {

    let newsCustomers = []
    newsCustomers = req.body.rows

    newsCustomers.map((customer) => {
        let codeCustomer = customer[0]
            //console.log(customer)
        if (customer[0] !== 'codeCustomer') {
            //  customer.numCustomer = customer[0]

            savePerson(customer).then((newPerson) => {

                saveCustomer(newPerson, codeCustomer).then((newCustomer) => {
                    console.log("Customer creado. " + newCustomer)
                })

            }).catch((err) => {
                console.log("Err=" + err)
            })
        }

    })

    return res.status(200).json({
        ok: true,
    })

}

module.exports = { findCustomerById, createCustomer, listCustomer, deleteCustomer, updateCustomer, listCustomerByName, lastCodeCustomer, updateActiveCustomer, uploadCustomer }