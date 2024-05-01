const { response } = require('express')

const { Role, Estatus } = require('../models/index.models')
const { obtenerEstatusActivo, obtenerEstatusNombre } = require('../helpers/db_validators.helpers')

const roleGet = async (req, res = response) =>{

    try {
        
    // const state = {state : true}

    // let {limit, from} = req.query

    // // Verificar y asignar valores predeterminados si son cadenas vacías o no están definidos
    // limit = limit === '' || limit === undefined ? 5 : Number(limit);
    // from = from === '' || from === undefined ? 0 : Number(from);

    // const [total, role] = await Promise.all([
    //     Role.countDocuments(state),
    //     Role.find(state)
    //                     .skip(Number(from))
    //                     .limit(Number(limit))
    // ])
    
    const role = await Role.find()

    res.json({
        ok: true,
        body: role
    })
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

const rolePost = async (req, res = response) =>{

    try {
        const { nombre } = req.body        

        const estatus = await obtenerEstatusActivo()
        
        const fecha_creacion = new Date()         

        const roleNuevo = new Role({ nombre, uid_estatus: estatus._id, fecha_creacion })                

        await roleNuevo.save()

        res.json({
            ok: true,
            body: roleNuevo       
        })    
    } catch(error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`       
        })    
    }
    
    
}

const rolePut = async (req, res = response) => {
    

    try {
        const { id } = req.params
    

        const {nombre} = req.body    
        
        const fecha_modificacion = new Date()
        
        const uid_modificado_por = req.usuario.uid

        // Validar en la base de datos    
        const role = await Role.findByIdAndUpdate(id, { nombre, fecha_modificacion, uid_modificado_por }, {new: true})    

        res.json({
            ok: true,
            body: role
        })
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }

    
}

const roleDelete = async (req, res = response) => {    

    try {

        const { id } = req.params
    

        const {estatus} = req.body

        const estatusBuscado = await obtenerEstatusNombre(estatus)                
        const fecha_modificacion = new Date()  
        const uid_modificado_por = req.usuario.uid

        // Desactivar
        const role = await Role.findByIdAndUpdate(id, {uid_estatus: estatusBuscado._id, fecha_modificacion, uid_modificado_por}, {new: true})

        res.json({
            ok: true,
            body: role
        })
        
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

module.exports = {
    roleGet,
    rolePost,
    rolePut,
    roleDelete
}