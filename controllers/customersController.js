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

        console.log(customers);
    });
}

const listCustomerByName = async(req, res) => {

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
        email,
        city,
        location,
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
            email,
            city,
            location,
        })

        //guardamos el usuario en la base de datos
        if (await newPerson.save()) {

            try {

                newCustomer = new Customer({
                    codeCustomer,
                    personid: newPerson._id,
                })

                if (newCustomer.save()) {

                    res.status(201).json({
                        ok: true,
                        msg: 'Cliente creado exitosamente',
                        newPerson,
                        newCustomer
                    })
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

module.exports = { createCustomer, listCustomer, deleteCustomer, updateCustomer, listCustomerByName }