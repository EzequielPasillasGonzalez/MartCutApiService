const { response } = require("express");

const { TipoProucto } = require('../models/index.models');
const { buscarCorreoUserModify, obtenerEstatusActivo, existeIDEstatus } = require("../helpers/db_validators.helpers");

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
const getCategories = async (req, res = response) =>{

    try {
        // const query = {state: true}

        // let { limit, from} = req.query
    
        // limit = limit === '' || limit === undefined ? 5 : Number(limit);
        // from = from === '' || from === undefined ? 0 : Number(from);
    
        // const [total, categories] = await Promise.all([
        //     Category.countDocuments(query),
        //     Category.find(query)
        //                         .skip(Number(from))
        //                         .limit(Number(limit))
        //                         .populate('userCreate', 'nombre') 
        //                         .populate('userModify', 'nombre')                                                                      
        // ])

        const categories = await TipoProucto.aggregate([{
            $lookup: {
                from: 'estatus',
                localField: 'uid_estatus',
                foreignField: '_id',
                as: 'datos_estatus'
            }
        },
        {
            $unwid: '$datos_estatus'
        },
        {
            $project: {
                nombre: 1,
                nombre_estatus: '$datos_estatus.nombre', // Asume que el campo del nombre del estatus es 'nombre'
                fecha_creacion: 1,
                uid: '$_id'
              }
        }
    ])

        console.log(categories);

        
        
        res.json({
            ok: true,            
            body: categories            
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
        
        const {id} = req.params

        const category = await Category.findById(id)
                                                .populate('userCreate', 'nombre') 
                                                .populate('userModify', 'nombre') 

        res.json({
            ok: true,            
            body: category
        })

    } catch(error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`       
        }) 
    }
}

// Actualizar categoria - recibes ID - y cambias nombre
const updateCategoryByID = async (req, res = response) => {
    try {
        
        const {id} = req.params

        const {correo} = req.usuario
        const usuario =  await buscarCorreoUserModify(correo)

        let datos = req.body
        
        const modifyDate = new Date()

        datos.modifyDate = modifyDate
        datos.userModify = usuario

        const category = await Category.findByIdAndUpdate(id, datos)
                                                .populate('userCreate', 'nombre') 
                                                .populate('userModify', 'nombre')                                                

        res.json({
            ok: true,            
            body: category
        })

    } catch(error) {
        res.json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`       
        }) 
    }
}

const deleteCategoryByID = async (req, res = response) => {
    try {
        
        const {correo} = req.usuario
        const usuario =  await buscarCorreoUserModify(correo)

        const {id} = req.params
        let datos = {state: false}        
        const modifyDate = new Date()

        datos.modifyDate = modifyDate
        datos.userModify = usuario

        const category = await Category.findByIdAndUpdate(id, datos)
                                                .populate('userCreate', 'nombre') 
                                                .populate('userModify', 'nombre')                                                

        res.json({
            ok: true,            
            body: category
        })

    } catch(error) {
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
    deleteCategoryByID
}