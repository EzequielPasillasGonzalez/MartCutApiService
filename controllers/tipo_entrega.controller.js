const { response } = require("express");

const { TipoEntrega } = require('../models/index.models');
const { obtenerEstatusActivo, getTipoEntregaHelper, getTipoEntregaById, nombreTipoEntregaExisteProducto, obtenerEstatusNombre } = require("../helpers/index.helpers");


const createTipoEntrega = async (req, res = response) => {

    try {

        const { nombre } = req.body

        const createDate = new Date()

        const estatusActivo = await obtenerEstatusActivo()

        //Generar la data a guardar
        const data = {
            nombre,
            fecha_creacion: createDate,
            uid_estatus: estatusActivo._id
        }

        const category = new TipoEntrega(data)

        await category.save()

        return res.status(200).json({
            ok: true,
            body: `El tipo de entrega ${category.nombre} fue creado exitosamente`
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })

    }
}

// Obtenercategorias - paginado - total - populate / Para que obtenga los datos del usario
const getTipoEntregas = async (req, res = response) => {

    try {


        const tipoProducto = await getTipoEntregaHelper()

        if(tipoProducto.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: tipoProducto
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

// Obtenercategoria - populate
const getTipoEntregaByID = async (req, res = response) => {
    try {

        const { id } = req.params

        const category = await getTipoEntregaById(id)

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

const getTipoEntregaByIDAll = async (req, res = response) => {
    try {

        const { id } = req.params

        const category = await TipoEntrega.findById(id)

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

const getTipoEntregaByNombre = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const category = await nombreTipoEntregaExisteProducto(nombre)

        if(category.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        let categoria
        if (category) {
            categoria = await getTipoEntregaById(category._id.toString())
        } else {
            res.json({
                ok: false,
                body: `Ocurrio un problema con el servidor, contacta con el administrador.`
            })
        }

        if(categoria.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: categoria
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getTipoEntregaByNombreAll = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const category = await nombreTipoEntregaExisteProducto(nombre)

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

// Actualizar categoria - recibes ID - y cambias nombre
const updateTipoEntregaByID = async (req, res = response) => {
    try {

        const { id } = req.params

        const uid_modificado_por = req.usuario.uid
        const fecha_creacion = new Date()

        let { nombre } = req.body



        // datos.modifyDate = modifyDate
        // datos.userModify = usuario

        const category = await TipoEntrega.findByIdAndUpdate(id, { uid_modificado_por, fecha_creacion, nombre }, { new: true })

        let tipoID
        if (category) {
            tipoID = await getTipoEntregaById(id)
        } else {
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

const deleteTipoEntregaByID = async (req, res = response) => {
    try {

        const { id } = req.params
        const uid_modificado_por = req.usuario.uid
        const fecha_modificacion = new Date()

        const { estatus } = req.body

        const estatusBuscado = await obtenerEstatusNombre(estatus)

        const category = await TipoEntrega.findByIdAndUpdate(id, { uid_estatus: estatusBuscado._id, fecha_modificacion, uid_modificado_por }, { new: true })

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


module.exports = {
    createTipoEntrega,
    getTipoEntregas,
    getTipoEntregaByID,
    getTipoEntregaByIDAll,
    getTipoEntregaByNombre,
    getTipoEntregaByNombreAll,
    updateTipoEntregaByID,
    deleteTipoEntregaByID
}