const { response } = require("express");

const { Emprendimiento, Usuario } = require('../models/index.models');
const { validaEstatusActivo, buscarNombreEmprendimiento, obtenerEstatusNombre, getEmprendimientosById, verificarExisteNombreEmprendimiento, buscarIdEmprendimiento, getEmprendimientos, obtenerEstatusActivo } = require("../helpers/index.helpers");








const createEmprendimiento = async (req, res = response) => {
    try {
        const { ...resto } = req.body        


        const {uid} = req.usuario

        let verficarYaCuentaConEmprendimiento = await Usuario.findById(uid)        

        if(verficarYaCuentaConEmprendimiento.uid_emprendimiento){

            let estaActivoEmprendimiento = await Emprendimiento.findById(verficarYaCuentaConEmprendimiento.uid_emprendimiento)            

            let verificarEstatus = await validaEstatusActivo(estaActivoEmprendimiento)
            
            if(verificarEstatus === true){
                return res.status(400).json({
                    ok: false,
                    body: 'El usuario ya cuenta con un emprendimiento activo'
                })
            }
            
        }
        

        const fecha_creacion = new Date()

        const estatusActivo = await obtenerEstatusActivo()

        let emprendimiento = new Emprendimiento({fecha_creacion, uid_estatus: estatusActivo._id, uid_usuario_emprendedor: uid,...resto})

        await emprendimiento.save()           

        await Usuario.findByIdAndUpdate(uid, {uid_emprendimiento: emprendimiento._id}, {new: true})

        

        

        return res.status(200).json({
            ok: true,
            body: emprendimiento
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const emprendimientosGet = async (req, res = response) => {
    try {        
        const usuarios = await getEmprendimientos()

        if(usuarios.length === 0){
            return res.json({
                ok: true,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: usuarios,
        })
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }

}

const getEmprendimientoById = async (req, res = response) => {
    try {
        
        const emprendimiento = await getEmprendimientosById(req.params.id)

        if(emprendimiento.length === 0){
            return res.json({
                ok: true,
                body: 'No hay datos con esta caracteristica'
            })    
        } 
        res.json({
            ok: true,
            body: emprendimiento
        })
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }

}

const getEmprendimientoByIdAll = async (req, res = response) => {
    try {
        

        res.json({
            ok: true,
            body: req.emprendimiento
        })
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }

}

const updateEmprendimientoByID = async (req, res = response) => {
    try {

        const { id } = req.params

        const uid_modificado_por = req.usuario.uid
        const fecha_modificacion = new Date() 

        let { uid_centro_universitario, uid_tipo_entrega, uid_producto, estatus, ...resto } = req.body

        objetoActualizar = {
            ...resto,
            uid_modificado_por,
            fecha_modificacion
        }        

        if(uid_centro_universitario){
            objetoActualizar.$addToSet = { uid_centro_universitario: req.body.uid_centro_universitario };
        }

        if(uid_tipo_entrega){
            objetoActualizar.$addToSet = { uid_tipo_entrega: req.body.uid_tipo_entrega }            
        }

        if(uid_producto){
            objetoActualizar.$addToSet = { uid_producto: req.body.uid_producto }
        }


        if(estatus){
            let estatusBuscado = await obtenerEstatusNombre(estatus)
            objetoActualizar.uid_estatus= estatusBuscado._id
        }


        const emprendimiento = await Emprendimiento.findByIdAndUpdate(id, objetoActualizar, { new: true });        

        res.json({
            ok: true,
            body: emprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getEmprendimientoByNombre = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const nombreEmprendimiento = await buscarNombreEmprendimiento(nombre)        
        
        let emprendimiento
        if(nombreEmprendimiento){
            emprendimiento = await getEmprendimientosById(nombreEmprendimiento._id.toString())
        }else {
            return res.json({
                ok: false,
                body: `Ocurrio un problema con el servidor, contacta con el administrador.`
            })
        }

        if(emprendimiento.length === 0){
            return res.json({
                ok: true,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: emprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getEmprendimientoByNombreAll = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const emprendimiento = await buscarNombreEmprendimiento(nombre)

        res.json({
            ok: true,
            body: emprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const deleteEmprendimientoByID = async (req, res = response) => {
    try {            

        const { id } = req.params
        const uid_modificado_por = req.usuario.uid
        const fecha_modificacion = new Date() 

        const {estatus} = req.body

        const estatusBuscado = await obtenerEstatusNombre(estatus)                


        const emprendimiento = await Emprendimiento.findByIdAndUpdate(id, { uid_estatus: estatusBuscado._id, fecha_modificacion, uid_modificado_por }, {new: true})

        res.json({
            ok: true,
            body: emprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

module.exports = {
    createEmprendimiento,
    emprendimientosGet,
    updateEmprendimientoByID,
    getEmprendimientoById,
    getEmprendimientoByIdAll,
    getEmprendimientoByNombre,
    getEmprendimientoByNombreAll,
    deleteEmprendimientoByID,
}