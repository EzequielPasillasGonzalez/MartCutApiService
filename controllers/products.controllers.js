const { response } = require("express");

const { Producto } = require('../models/index.models');
const { buscarCorreoUserModify, buscarCategoriaModificarProducto } = require("../helpers/index.helpers");
const { obtenerEstatusActivo } = require("../helpers/db_validators/estatus.helpers");

const createProduct = async(req, res = response) =>{
    try {
        const {nombre, tipo_producto,...resto} = req.body

        const {uid} = req.usuario

        const fecha_creacion = new Date()  
        
        const estatusActivo = await obtenerEstatusActivo()                

        if(tipo_producto){
            
        }

        

        const product = new Producto({fecha_creacion, uid_estatus: estatusActivo, uid_usuario_emprendedor: uid, nombre, ...resto})

        await product.save()

        res.json({
            ok: true,    
            body: 'product'
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

        const query = {state: true}

        // let { limit, from} = req.query
    
        // limit = limit === '' || limit === undefined ? 5 : Number(limit);
        // from = from === '' || from === undefined ? 0 : Number(from);        
    
        const [total, product] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                                // .limit(Number(limit))
                                // .skip(Number(from))
                                .populate('category', 'nombre')
                                .populate('userCreate', 'nombre')
                                .populate('userModify', 'nombre')
        ])

        res.json({
            ok: true,                
            body: {
                total,
                product
            }
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
        
        const {id} = req.params        

        const resultadoBusqueda = await Producto.findById(id)
                                                            .populate('category', 'nombre') 
                                                            .populate('userCreate', 'nombre') 
                                                            .populate('userModify', 'nombre')

        res.json({
            ok: true,
            body: resultadoBusqueda
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
        
        const {correo} = req.usuario
        const usuario =  await buscarCorreoUserModify(correo)

        const {id} = req.params

        let { category, ...resto} = req.body

        const categoria = await buscarCategoriaModificarProducto((category))        

        const modifyDate = new Date()             
        
        

        resto.modifyDate = modifyDate    
        resto.category = categoria
        resto.userModify = usuario

        const producto = await Producto.findByIdAndUpdate(id, resto, {new : true}) //** Con el new : true trae el nuevo valor */
                                                .populate('category', 'nombre') 
                                                .populate('userCreate', 'nombre') 
                                                .populate('userModify', 'nombre correo')
                                                
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

const updateProductList = async ( req, res = response) => {
    
    try {
        
        const {order} = req.body

        let newProduct


        for (const product of order) {
            let {id, cantidad, ...resto} = product

            let nuevaCantidad = cantidad - 1;

            // Actualizar la cantidad en el objeto product
            product.cantidad = nuevaCantidad;

            newProduct = await Producto.findByIdAndUpdate(id, product, {new : true}) 

        }

        res.json({
            ok: true,
            body: 'Compra realizada'
        })
    

    } catch (error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }


}

const deleteProduct = async ( req, res = response) => {
    try {        

        // const {correo} = req.usuario
        // const usuario =  await buscarCorreoUserModify(correo)

        const { id } = req.params

        let datos = { state: false}

        const modifyDate = new Date()

        // datos.userModify = usuario
        // datos.modifyDate = modifyDate

        const product = await Producto.findByIdAndUpdate(id, datos, {new : true})
                                                        .populate('category', 'nombre') 
                                                        // .populate('userCreate', 'nombre') 
                                                        // .populate('userModify', 'nombre')



        res.json({
            ok: true,
            body: product
        })

    } catch(error) {
        res.json({
            ok: false,
            body: `Error al acceder a la base de datos ${error}`
        })
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateProductList,
    deleteProduct
}