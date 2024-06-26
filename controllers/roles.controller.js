const { response } = require('express')

const { Role, Estatus } = require('../models/index.models')
const { obtenerEstatusActivo, obtenerEstatusNombre, getRole, existeIDRole, obtenerRolNombre, getRolById } = require('../helpers/index.helpers')

const roleGet = async (req, res = response) =>{

    try {
        

    const role = await getRole()

    if(role.length === 0){
        return res.json({
            ok: false,
            body: 'No hay datos con esta caracteristica'
        })    
    } 

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

const getRolByIDAll = async (req, res = response) => {
    try {

        const { id } = req.params

        const category = await Role.findById(id)

        if(category.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: category
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getRolByNombreAll = async (req, res = response) => {
    try {   
        
        const { nombre } = req.body

        const rol = await obtenerRolNombre(nombre)

        if(rol.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: rol
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getRolByNombre = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const rol = await obtenerRolNombre(nombre)

        if(rol.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 
        
        let rolBuscado
        if(rol){
            rolBuscado = await getRolById(rol._id.toString())
        }else {
            res.json({
                ok: false,
                body: `Ocurrio un problema con el servidor, contacta con el administrador.`
            })
        }

        if(rolBuscado.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: rolBuscado
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
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
    roleDelete,
    getRolByNombre,
    getRolByIDAll,
    getRolByNombreAll
}