const { response } = require('express')
const bcryptjs = require('bcryptjs')

const {Usuario, Estatus, Role} = require('../models/index.models')
const { obtenerRolUsuario, obtenerEstatusActivo, existeIdUsuario, obtenerRolEmprendedor, celularExiste, getUsuarios, obtenerEstatusInactivo, obtenerEstatusPausado, obtenerEstatusNombre } = require('../helpers/db_validators.helpers')


const usuariosGet = async (req, res = response) => {
    
    // const query = {state: true} //? Es para contar los que estan activos

    // let { limit, from} = req.query

    // // Verificar y asignar valores predeterminados si son cadenas vacías o no están definidos
    // limit = limit === '' || limit === undefined ? 5 : Number(limit);
    // from = from === '' || from === undefined ? 0 : Number(from);

    // const [total, user] = await Promise.all([
    //     Usuario.countDocuments(query), //? Buscan solo los que estan activos
    //     Usuario.find(query)
    //                     .skip(Number(from))
    //                     .limit(Number(limit))
    // ])

    const usuarios = await getUsuarios()

    res.json({
        ok: true,         
        body: usuarios,        
    })
}

const usuariosPut = async (req, res = response) => {

    try {
        const {id} = req.params
        const { _id, passwordNueva, google, password, rol, correo, celular, uid_estatus, ...resto } = req.body        
            
    if(password && passwordNueva && password.length >= 8 && passwordNueva.length >= 8){

        const user = await existeIdUsuario(id)        

        // Verficar la contraseña
        const password_validate = bcryptjs.compareSync(password, user.password)        
        
        if(!password_validate){
            return res.status(400).json({
                ok: false,
                body: "Verifica la contraseña original"
            })
        }

        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(passwordNueva, salt)        
    }            

    if(celular){
        const existeCelular = await celularExiste(celular)        
        if(existeCelular === true){
            resto.celular = celular
        }
    }

    const fecha_modificacion = new Date()

    resto.fecha_modificacion = fecha_modificacion          
    
    //Todo: validar con la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new : true})

    res.json({
        ok: true,        
        body: usuario
    })        
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
    
}

const usuariosAltaEmprendedor = async (req, res = response) => {

    try {
        const {id} = req.params
    const { rol, ...resto } = req.body 
    
    if(rol === true){
        const fecha_modificacion = new Date()  
        const rolEmprendedor = await obtenerRolEmprendedor()                   
    
        //Todo: validar con la base de datos
        const usuario = await Usuario.findByIdAndUpdate(id, {uid_rol: rolEmprendedor._id, fecha_modificacion}, {new : true})

        res.json({
            ok: true,        
            body: usuario
        })        
    }
    
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
    
}

const usuariosPost = async (req, res = response) => {
    
    try {
        const { password, apellido_materno, ...resto } = req.body

        const rolUsuario = await obtenerRolUsuario()
        const estatusActivo = await obtenerEstatusActivo()

        const fecha_creacion = new Date()

        

        let usuario = new Usuario({ password, uid_rol: rolUsuario._id, uid_estatus: estatusActivo._id, fecha_creacion, ...resto })

        if (apellido_materno) {
            usuario.apellido_materno = apellido_materno
        }      

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        usuario.password = bcryptjs.hashSync(password, salt)

        //Guardar en BD
        await usuario.save()


        res.json({
            ok: true,
            body: usuario
        })
    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

const usuariosDelete = async (req, res = response) => {

    try {
        const {id} = req.params        

        const {estatus} = req.body

        const rolBuscado = await obtenerEstatusNombre(estatus)        

        // Se elimina logicamente, solo se pone en inactivo el estatus
        const usuario = await Usuario.findByIdAndUpdate(id, {uid_estatus: rolBuscado._id},  {new : true}) // Se cambia el estatus para no perder integridad    

        res.json({
            ok: true,
            body: usuario,  
        
        })
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
    
}

const usuariosBaja = async (req, res = response) => {    

    try {

        const {id} = req.params        


    const rolInactivo = await obtenerEstatusPausado()    

    // Se elimina logicamente, solo se pone en inactivo el estatus
    const usuario = await Usuario.findByIdAndUpdate(id, {uid_estatus: rolInactivo._id},  {new : true}) // Se cambia el estatus para no perder integridad    

    res.json({
        ok: true,
        body: usuario,  
       
    })
        
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        body: 'PATCH Api - Controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosAltaEmprendedor,
    usuariosBaja
}