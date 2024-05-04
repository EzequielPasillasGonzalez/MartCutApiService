const { response } = require("express");
const { extraerNombresCategoria } = require("../helpers/index.helpers");
const { Usuario, Category, Role, Producto } = require("../models/index.models");

const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {
    try {
        
        const esMongoID = ObjectId.isValid(termino) // True
        

        if(esMongoID) {
            const usuario = await Usuario.findById(termino)

            return res.json({
                ok: true,
                body: {
                    results: (usuario) ? [usuario] : []
                }
            })
        }

        const regex = new RegExp( termino, 'i')        //** Hacerlo insensible a mayusculas o minusculas  */

        const usuarios = await Usuario.find({
            $or: [{nombre: regex }, {correo: regex}],
            $and : [{state: true}]
        })

        return res.json({
            ok: true,
            body: {
                results: [usuarios]
            }
        })


    } catch(error) {
        
        return res.status(500).json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const buscarProductos = async (termino = '', res = response) => {
    try {
        
        const esMongoID = ObjectId.isValid(termino) // True
        

        if(esMongoID) {
            const producto = await Producto.findById(termino)
                                                .populate('category', 'nombre')
                                                .populate('userCreate', 'nombre')
                                                .populate('userModify', 'nombre')

            return res.json({
                ok: true,
                body: {
                    results: (producto) ? [producto] : []
                }
            })
        }

        const regex = new RegExp( termino, 'i')        //** Hacerlo insensible a mayusculas o minusculas  */

        const productos = await Producto.find({
            $or: [{nombre: regex }],
            $and : [{state: true}]
        })
            .populate('category', 'nombre')
            .populate('userCreate', 'nombre')
            .populate('userModify', 'nombre')

        return res.json({
            ok: true,
            body: {
                results: [productos]
            }
        })


    } catch(error) {
        
        return res.status(500).json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const buscarCategorias = async (termino = '', res = response) => {
    try {
        
        const esMongoID = ObjectId.isValid(termino) // True
        

        if(esMongoID) {
            const categoria = await Category.findById(termino)
                                                    .populate('userCreate', 'nombre') 
                                                    .populate('userModify', 'nombre') 

            return res.json({
                ok: true,
                body: {
                    results: (categoria) ? [categoria] : []
                }
            })
        }

        const regex = new RegExp( termino, 'i')        //** Hacerlo insensible a mayusculas o minusculas  */

        const categorias = await Category.find({
            $or: [{nombre: regex }],
            $and : [{state: true}]
        })
            .populate('userCreate', 'nombre') 
            .populate('userModify', 'nombre') 

        return res.json({
            ok: true,
            body: {
                results: [categorias]
            }
        })


    } catch(error) {
        
        return res.status(500).json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const buscarRoles = async (termino = '', res = response) => {
    try {
        
        const esMongoID = ObjectId.isValid(termino) // True
        

        if(esMongoID) {
            const role = await Role.findById(termino)

            return res.json({
                ok: true,
                body: {
                    results: (role) ? [role] : []
                }
            })
        }

        const regex = new RegExp( termino, 'i')        //** Hacerlo insensible a mayusculas o minusculas  */

        const roles = await Role.find({
            $or: [{role: regex }],
            $and : [{state: true}]
        })

        return res.json({
            ok: true,
            body: {
                results: [roles]
            }
        })


    } catch(error) {
        
        return res.status(500).json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const buscar = async ( req, res = response) => {       

    try {

        const {coleccion, termino} = req.params    
        

        if(!coleccionesPermitidas.includes(coleccion)){
            return res.status(404).json({
                ok: false,
                body: `La categoria ${coleccion} no existe en la base de datos`
            })
        }

        //const categorias = await extraerNombresCategoria()
        

        // if(!categorias.includes(coleccion)){
        //     return res.status(404).json({
        //         ok: false,
        //         body: `La categoria ${coleccion} no existe en la base de datos`
        //     })
        // }


        switch(coleccion) {
            case 'usuarios':
                buscarUsuarios(termino, res)
                break

            case 'categoria':
                buscarCategorias(termino, res)
                break

            case 'productos':
                buscarProductos(termino, res)
                break

            case 'roles':
                buscarRoles(termino, res)
                break

            default:
                return res.status(500).json({
                    ok: false,
                    body: `No he implementado esa coleccion`
                })
        }


        
    } catch(error) {
        return res.status(500).json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

module.exports = {
    buscar
}