const { response } = require("express");

const { TipoProucto } = require('../models/index.models');
const { obtenerEstatusActivo, getTipoProducto, getTipoProductoById, nombreTipoProductoExisteProduct, obtenerEstatusNombre } = require("../helpers/index.helpers");

const createCategory = async (req, res = response) => {

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

        const category = new TipoProucto(data)

        await category.save()

        return res.status(200).json({
            ok: true,
            body: `La cetegoria ${category.nombre} fue creada exitosamente`
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })

    }
}

// Obtenercategorias - paginado - total - populate / Para que obtenga los datos del usario
const getCategories = async (req, res = response) => {

    try {
        

        const tipoProducto = await getTipoProducto()

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
const getCategoryByID = async (req, res = response) => {
    try {

        const { id } = req.params

        const category = await getTipoProductoById(id)

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

const getCategoryByIDAll = async (req, res = response) => {
    try {

        const { id } = req.params

        const category = await TipoProucto.findById(id)

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

const getCategoryByNombre = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const category = await nombreTipoProductoExisteProduct(nombre)
        
        let categoria
        if(category){
            categoria = await getTipoProductoById(category._id.toString())
        }else {
            res.json({
                ok: false,
                body: `Ocurrio un problema con el servidor, contacta con el administrador.`
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

const getCategoryByNombreAll = async (req, res = response) => {
    try {

        const { nombre } = req.body

        const category = await nombreTipoProductoExisteProduct(nombre)

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
const updateCategoryByID = async (req, res = response) => {
    try {

        const { id } = req.params

        const uid_modificado_por = req.usuario.uid
        const fecha_creacion = new Date() 

        let { nombre } = req.body

        

        // datos.modifyDate = modifyDate
        // datos.userModify = usuario

        const category = await TipoProucto.findByIdAndUpdate(id, { uid_modificado_por, fecha_creacion, nombre }, {new: true})            

        let tipoID
        if(category){
            tipoID = await getTipoProductoById(id)
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

const deleteCategoryByID = async (req, res = response) => {
    try {            

        const { id } = req.params
        const uid_modificado_por = req.usuario.uid
        const fecha_modificacion = new Date() 

        const {estatus} = req.body

        const estatusBuscado = await obtenerEstatusNombre(estatus)                

        const category = await TipoProucto.findByIdAndUpdate(id, { uid_estatus: estatusBuscado._id, fecha_modificacion, uid_modificado_por }, {new: true})

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
    createCategory,
    getCategories,
    getCategoryByID,
    updateCategoryByID,
    deleteCategoryByID,
    getCategoryByNombre,
    getCategoryByNombreAll,
    getCategoryByIDAll
}