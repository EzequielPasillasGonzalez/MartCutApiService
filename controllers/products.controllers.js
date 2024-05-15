const { response } = require("express");

const { Producto, Emprendimiento } = require('../models/index.models');
const { getProductos, getProductosLimpios, getProductosPorNombre, getProductosById, obtenerEstatusNombre, obtenerEstatusActivo, nombreTipoProductoExisteProduct, buscarCorreoUserModify, buscarCategoriaModificarProducto } = require("../helpers/index.helpers");


const createProduct = async(req, res = response) =>{
    try {
        const {nombre, tipo_producto,...resto} = req.body

        const {uid, uid_emprendimiento} = req.usuario        

        const fecha_creacion = new Date()

        const uid_estatus = await obtenerEstatusActivo()



        objetoCrear = {
            ...resto,
            fecha_creacion,
            uid_estatus,
            uid_usuario_emprendedor: uid,
            nombre
        }

        objetoActualizar = {}

        if(tipo_producto){
            
            const tipoProducto = await nombreTipoProductoExisteProduct(tipo_producto)
            objetoCrear.uid_tipo_producto = tipoProducto
        }

        const product = new Producto(objetoCrear)

        await product.save()

        if(uid_emprendimiento){
            objetoActualizar.$addToSet = { uid_producto: product._id }            
        }

        const emprendimiento = await Emprendimiento.findByIdAndUpdate(uid_emprendimiento, objetoActualizar, { new: true });        

        res.json({
            ok: true,
            body: `El ${product.nombre} ha sido creado exitosamente`
        })

    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const getProducts = async (req, res = response) =>{
    try {

        const productos = await getProductos()

        if(productos.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: productos
        })
    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const getProductsAllLimpios = async (req, res = response) =>{
    try {

        const productos = await getProductosLimpios()

        if(productos.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: productos
        })
    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const getProductsAll = async (req, res = response) =>{
    try {

        const productos = await Producto.find()

        if(productos.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: productos
        })
    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const getProductById = async ( req, res = response) => {
    try {        

        const producto = await getProductosById(req.producto._id)

        if(productos.length === 0){
            return res.json({
                ok: false,
                body: 'No hay datos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: producto
        })

    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const getProductByIdAll = async ( req, res = response) => {
    try {                        
        res.json({
            ok: true,
            body: req.producto
        })

    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const updateProduct = async ( req, res = response) => {
    try {

        
        const {_id: uid_producto} = req.producto

        const uid_modificado_por = req.usuario.uid

        const {uid_estatus, fecha_creacion, ...resto} = req.body

        const fecha_modificacion = new Date() 

        const producto = await Producto.findByIdAndUpdate(uid_producto, { fecha_modificacion, uid_modificado_por, ...resto }, {new: true})


        res.json({
            ok: true,
            body: producto
        })

    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

const deleteProduct = async ( req, res = response) => {
    try {            

        const {_id: uid_producto} = req.producto
        const uid_modificado_por = req.usuario.uid
        const fecha_modificacion = new Date() 

        const {estatus} = req.body

        const estatusBuscado = await obtenerEstatusNombre(estatus)                


        const producto = await Producto.findByIdAndUpdate(uid_producto, { uid_estatus: estatusBuscado._id, fecha_modificacion, uid_modificado_por }, {new: true})

        res.json({
            ok: true,
            body: producto
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

const getProductosByNombre = async (req, res = response) => {
    try {

        const { nombre } = req.body        
        
        let productos = await getProductosPorNombre(nombre)
        
        if(productos.length === 0){
            return res.json({
                ok: false,
                body: 'No hay productos con esta caracteristica'
            })    
        } 

        res.json({
            ok: true,
            body: productos
        })

    } catch (error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductsAll,
    getProductsAllLimpios,
    getProductById,
    getProductByIdAll,
    updateProduct,    
    deleteProduct,
    getProductosByNombre
}