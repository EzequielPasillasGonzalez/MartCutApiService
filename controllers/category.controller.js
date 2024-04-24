const { response } = require("express");

const { Category } = require('../models/index.models');
const { buscarCorreoUserModify } = require("../helpers/db_validators.helpers");

const createCategory = async (req, res = response) => {

    try {

    const nombre = req.body.nombre.toUpperCase()


    const regex = new RegExp( nombre, 'i') 

    const categoryDB = await Category.findOne({ nombre: regex })    

    if(categoryDB) {
        return res.status(400).json({
            ok: false,
            body: `La categoria ${categoryDB.nombre}, ya existe`
        })
    }

    const fechaCreacion = new Date()    

    //Generar la data a guardar
    const data = {
        nombre,
        userCreate: req.usuario.uid,
        userModify: req.usuario.uid,
        createDate: fechaCreacion,
        modifyDate: fechaCreacion
    }

    const category = new Category(data)

    await category.save()

    return res.status(201).json({
        ok: true,
        body: `La cetegoria ${category.nombre} fue creada exitosamente`
    })

    } catch (error) {

        res.status(500).json({
            ok: false,            
            body: 'Problemas al obtener los datos con el servidor',            
        })

    }
}

// Obtenercategorias - paginado - total - populate / Para que obtenga los datos del usario
const getCategories = async (req, res = response) =>{

    try {
        const query = {state: true}

        let { limit, from} = req.query
    
        limit = limit === '' || limit === undefined ? 5 : Number(limit);
        from = from === '' || from === undefined ? 0 : Number(from);
    
        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                                .skip(Number(from))
                                .limit(Number(limit))
                                .populate('userCreate', 'nombre') 
                                .populate('userModify', 'nombre')                                                                      
        ])
        
        res.json({
            ok: true,            
            body: {
                total,
                categories
            }
        })

    } catch (error) {
        res.status(500).json({
            ok: false,            
            body: `Problemas al obtener los datos con el servidor ${error}`,            
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
        res.status(500).json({
            ok: false,            
            body: `Problemas al obtener los datos con el servidor ${error}`,            
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
        res.status(500).json({
            ok: false,            
            body: `Problemas al obtener los datos con el servidor ${error}`,            
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
        res.status(500).json({
            ok: false,            
            body: `Problemas al obtener los datos con el servidor ${error}`,            
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