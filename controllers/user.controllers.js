const { response } = require('express')
const bcryptjs = require('bcryptjs')

const {Usuario } = require('../models/index.models')
const { getUsuariosId, obtenerRolUsuario, obtenerEstatusActivo, existeIdUsuario, obtenerRolEmprendedor, celularExiste, getUsuarios, obtenerEstatusInactivo, obtenerEstatusPausado, obtenerEstatusNombre } = require('../helpers/index.helpers')
const { buscarCorreoUserModify, getUsuariosNombre } = require('../helpers/db_validators/usuario.helpers')


const usuariosGet = async (req, res = response) => {
    try {
        const usuarios = await getUsuarios()

        res.json({
            ok: true,         
            body: usuarios,        
        })    
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
    
}

const usuariosGetId = async (req, res = response) => {
    try {        
        const {id} = req.params        
        const usuarios = await getUsuariosId(id)

        res.json({
            ok: true,         
            body: usuarios,        
        })    
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

const usuariosGetCorreo = async (req, res = response) => {
    try {        
        const {correo} = req.body
        
        const usuarioBuscado = await buscarCorreoUserModify(correo)        

        const usuarios = await getUsuariosId(usuarioBuscado._id)

        res.json({
            ok: true,         
            body: usuarios,        
        })    
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

const usuariosGetNombre = async (req, res = response) => {
    try {        
        const {nombre} = req.body
        
        const usuarioBuscado = await getUsuariosNombre(nombre)

        res.json({
            ok: true,         
            body: usuarioBuscado,        
        })    
    } catch(error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

const usuariosPutIDCambiarPassword = async (req, res = response) => {
    try {        

        const {id} = req.params

        const {password, ...resto} = req.body                
        
        if(password.length >= 8){
    
            const salt = bcryptjs.genSaltSync()
            resto.password = bcryptjs.hashSync(password, salt)        
        }else{
            res.json({
                ok: false,
                body: 'La contraseña no cumple los requerimientos minimos'
            })
        }

        const fecha_modificacion = new Date()

        const uid_modificado_por = req.usuario.uid
    
        resto.fecha_modificacion = fecha_modificacion          
        
        resto.uid_modificado_por = uid_modificado_por

        const usuario = await Usuario.findByIdAndUpdate(id, resto, {new : true})

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

    const uid_modificado_por = req.usuario.uid

    resto.fecha_modificacion = fecha_modificacion          
    
    resto.uid_modificado_por = uid_modificado_por

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
        const uid_modificado_por = req.usuario.uid
    
        //Todo: validar con la base de datos
        const usuario = await Usuario.findByIdAndUpdate(id, {uid_rol: rolEmprendedor._id, fecha_modificacion, uid_modificado_por}, {new : true})

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

        const estatusBuscado = await obtenerEstatusNombre(estatus)        
        const fecha_modificacion = new Date()  
        const uid_modificado_por = req.usuario.uid

        // Se elimina logicamente, solo se pone en inactivo el estatus
        const usuario = await Usuario.findByIdAndUpdate(id, {uid_estatus: estatusBuscado._id, fecha_modificacion, uid_modificado_por},  {new : true}) // Se cambia el estatus para no perder integridad    

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
    const fecha_modificacion = new Date() 
    const uid_modificado_por = req.usuario.uid

    // Se elimina logicamente, solo se pone en inactivo el estatus
    const usuario = await Usuario.findByIdAndUpdate(id, {uid_estatus: rolInactivo._id, fecha_modificacion, uid_modificado_por},  {new : true}) // Se cambia el estatus para no perder integridad    

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
    usuariosGetCorreo,
    usuariosGetId,
    usuariosGetNombre,
    usuariosPut,
    usuariosPutIDCambiarPassword,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosAltaEmprendedor,
    usuariosBaja
}