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

const findCustomerById = async(req, res) =>{

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

    await Customer.find({},'codeCustomer').sort({codeCustomer : -1}).limit(1)
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
                    codeCustomer,
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
                    }else{
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

}

const updateCustomer = async(req, res) => {

}

//Funcion para cambiar el estado del cliente
const updateActiveCustomer = async(req,res) =>{ 

    let id = req.params.id
  
    try {
           
        await Customer.findByIdAndUpdate(id, {active: req.body.active  }, {
            new: true, //devuelve el objeto actualizado
        },(err, customerDB) => {

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

        } )
    }
    catch{
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error Actualizando el Estaod del Cliente"
        })
    }
}

module.exports = { findCustomerById,createCustomer, listCustomer, deleteCustomer, updateCustomer, listCustomerByName, lastCodeCustomer, updateActiveCustomer }