const { response } = require("express");

const { Emprendimiento } = require('../models/index.models');
const { buscarNombreEmprendimiento, obtenerEstatusNombre, getEmprendimientosById, verificarExisteNombreEmprendimiento, buscarIdEmprendimiento, getEmprendimientos, obtenerEstatusActivo } = require("../helpers/index.helpers");






const createEmprendimiento = async (req, res = response) => {
    try {
        const { ...resto } = req.body        


        const {uid} = req.usuario
        

        const fecha_creacion = new Date()

        const estatusActivo = await obtenerEstatusActivo()

        let emprendimiento = new Emprendimiento({fecha_creacion, uid_estatus: estatusActivo._id, uid_usuario_emprendedor: uid,...resto})

        await emprendimiento.save()        

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

        let { uid_centro_universitario, uid_tipo_entrega, uid_producto, ...resto } = req.body

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