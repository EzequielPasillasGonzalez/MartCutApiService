const { response } = require('express')

const { Estatus } = require('../models/index.models')
const { getEstaus } = require('../helpers/index.helpers')


const estatusGet = async (req, res = response) => {
    
   try {
       const estatus = await getEstaus()

       res.json({
           ok: true,
           body: estatus,
       })
   } catch (error) {
       res.json({
           ok: false,
           body: error.message,
       })
   }

    
}

const estatusPut = async (req, res = response) => {


    try {

        const { id } = req.params
        const { nombre } = req.body

        const fecha_modificacion = new Date()  
        const uid_modificado_por = req.usuario.uid



        //Todo: validar con la base de datos
        const estatus = await Estatus.findByIdAndUpdate(id, { nombre, uid_modificado_por, fecha_modificacion  }, { new: true })


        res.json({
            ok: true,
            body: estatus
        })
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

const estatusPost = async (req, res = response) => {
    
    try {        

        const createDate = new Date()

        //? Se guardan los datos requeridos
        const data = {
            nombre: req.body.nombre,
            fecha_creacion: createDate
        }

        //? Se crea el objeto Estatus
        const estatus = new Estatus(data)

        //? Guardar en BD
        await estatus.save()


        res.json({
            ok: true,
            body: data
        })
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

// const estatusDelete = async (req, res = response) => {
//     const {id} = req.params        

//     // Se elimina logicamente, solo se pone en false el esado
//     const usuario = await Usuario.findByIdAndUpdate(id, {state: false}) // Se cambia el estado para no perder integridad

//     const usuarioAutenticado = req.usuario

//     res.json({
//         ok: true,
//         body: usuario,  
//         user: usuarioAutenticado        
//     })
// }

// const usuariosPatch = (req, res = response) => {
//     res.json({
//         ok: true,
//         body: 'PATCH Api - Controller'
//     })
// }

module.exports = {
    estatusGet,
    estatusPut,
    estatusPost    
}