const { response } = require("express");

const { CentroUniversitario } = require('../models/index.models');
const { getCentrosUniversitariosDB, obtenerEstatusNombre, buscarNombreTipoEmprendimiento, obtenerEstatusInactivo, obtenerEstatusActivo, getTipoEmprendimiento } = require("../helpers/index.helpers");



const createCentroUniversitario = async (req, res = response) => {

    try {

        const { nombre, abreviacion, domicilio } = req.body

        const createDate = new Date()

        const estatusActivo = await obtenerEstatusActivo()

        //Generar la data a guardar
        const data = {
            nombre,
            abreviado: abreviacion,
            domicilio,
            fecha_creacion: createDate,
            uid_estatus: estatusActivo._id
        }

        const centroU = new CentroUniversitario(data)

        await centroU.save()

        return res.status(200).json({
            ok: true,
            body: `El ${centroU.nombre} fue creada exitosamente`
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })

    }
}

const getCentrosUniversitarios = async (req, res = response) => {

    try {
        

        const tipoEmprendimiento = await getCentrosUniversitariosDB()

        res.json({
            ok: true,
            body: tipoEmprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getCentroUniversitarioByNombre = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const tipoEmprendimiento = await buscarNombreTipoEmprendimiento(nombre)
        
        let categoriaTipoEmprendimiento
        if(tipoEmprendimiento){
            categoriaTipoEmprendimiento = await getTipoEmprendimientoById(tipoEmprendimiento._id.toString())
        }else {
            res.json({
                ok: false,
                body: `Ocurrio un problema con el servidor, contacta con el administrador.`
            })
        }

        res.json({
            ok: true,
            body: categoriaTipoEmprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getCentroUniversitarioByNombreAll = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const tipoEmprendimiento = await buscarNombreTipoEmprendimiento(nombre)

        res.json({
            ok: true,
            body: tipoEmprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}
const getCentroUniversitarioByID = async (req, res = response) => {
    try {

        const { id } = req.params

        const tipoEmprendimiento = await getTipoEmprendimientoById(id)

        res.json({
            ok: true,
            body: tipoEmprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getCentroUniversitarioByIDAll = async (req, res = response) => {
    try {

        const { id } = req.params

        const tipoEmprendimiento = await CentroUniversitario.findById(id)

        res.json({
            ok: true,
            body: tipoEmprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const updateCentroUniversitarioByID = async (req, res = response) => {
    try {

        const { id } = req.params

        const uid_modificado_por = req.usuario.uid
        const fecha_creacion = new Date() 

        let { nombre } = req.body

        

        // datos.modifyDate = modifyDate
        // datos.userModify = usuario

        const tipoEmprendimiento = await CentroUniversitario.findByIdAndUpdate(id, { uid_modificado_por, fecha_creacion, nombre }, {new: true})            

        let tipoID
        if(tipoEmprendimiento){
            tipoID = await getTipoEmprendimientoById(id)
        }else{
            res.json({
                ok: false,
                body: `Ocurrio un problema con el servidor, contacta con el administrador.`
            })
        }

        res.json({
            ok: true,
            body: tipoID
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const deleteCentroUniversitarioByID = async (req, res = response) => {
    try {            

        const { id } = req.params
        const uid_modificado_por = req.usuario.uid
        const fecha_modificacion = new Date() 

        const {estatus} = req.body

        const estatusBuscado = await obtenerEstatusNombre(estatus)                

        const tipoEmprendimiento = await CentroUniversitario.findByIdAndUpdate(id, { uid_estatus: estatusBuscado._id, fecha_modificacion, uid_modificado_por }, {new: true})

        res.json({
            ok: true,
            body: tipoEmprendimiento
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}




module.exports = {
    deleteCentroUniversitarioByID,
    updateCentroUniversitarioByID,
    getCentroUniversitarioByIDAll,
    getCentroUniversitarioByID,
    getCentroUniversitarioByNombreAll,
    getCentroUniversitarioByNombre,
    getCentrosUniversitarios,
    createCentroUniversitario,    
}
