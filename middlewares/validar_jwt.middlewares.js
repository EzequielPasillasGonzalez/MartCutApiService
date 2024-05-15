const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { verificarEstatusParaActivar, verificarEstatusActivo, existeIdUsuario } = require('../helpers/index.helpers');

const validarJWT = async (req = request, res = response, next) =>{
    
    try {

        const token = req.header('jwt_token') // Como se esepecifica aqui, es como el front-end lo tiene que enviar    

        if(!token) {
            return res.status(401).json({
                ok: false,
                body: 'No hay token de autorizacion'
            })
        }
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)  //Se verifica si el token es valido y se le exrtae el uid
        
        // Leer el usuario que corresponde al uid
        const usuario = await existeIdUsuario(uid)                      
        
        // Validacion de null
        if( !usuario){
            return res.status(401).json({
                ok: false,
                body: 'El usuario no existe'
            })
        }

        const {nombre, correo, uid_rol, uid_emprendimiento} = usuario
        
        const estatusUsuario = await verificarEstatusActivo(usuario)        

        //? Verifica si el usuario esta activo
        if (!estatusUsuario) {
            return res.status(400).json({
                ok: false,
                body: "El estatus del usuario esta dado de baja, contacte con un administrador"
            })
        }
    
        // Guardar el usuario        
        req.usuario = {nombre, correo, uid_rol, uid, uid_emprendimiento} // Se le manda el uid por el request para los siguientes controladores
        

        next()
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                body: `Token expirado`
            });
        }

        res.status(401).json({
            ok: false,
            body: `Token no valido ${error.message}`
        })
    }    
}

const validarJWTActivarCuenta = async (req = request, res = response, next) =>{
    
    try {

        const token = req.header('jwt_token') // Como se esepecifica aqui, es como el front-end lo tiene que enviar    

        if(!token) {
            return res.status(401).json({
                ok: false,
                body: 'No hay token de autorizacion'
            })
        }
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)  //Se verifica si el token es valido y se le exrtae el uid
        
        // Leer el usuario que corresponde al uid
        const usuario = await existeIdUsuario(uid)                      
        
        // Validacion de null
        if( !usuario){
            return res.status(401).json({
                ok: false,
                body: 'El usuario no existe'
            })
        }

        const {nombre, correo, uid_rol} = usuario
        
        const estatusUsuario = await verificarEstatusParaActivar(usuario)        

        //? Verifica si el usuario esta activo
        if (!estatusUsuario) {
            return res.status(400).json({
                ok: false,
                body: "El estatus del usuario esta dado de baja, contacte con un administrador"
            })
        }
    
        // Guardar el usuario        
        req.usuario = {nombre, correo, uid_rol, uid} // Se le manda el uid por el request para los siguientes controladores
        

        next()
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                body: `Token expirado`
            });
        }

        res.status(401).json({
            ok: false,
            body: `Token no valido ${error.message}`
        })
    }    
}

const validarJWTReenviarcodigo = async (req = request, res = response, next) =>{
    
    try {

        const token = req.header('jwt_token') // Como se esepecifica aqui, es como el front-end lo tiene que enviar    

        if(!token) {
            return res.status(401).json({
                ok: false,
                body: 'No hay token de autorizacion'
            })
        }
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)  //Se verifica si el token es valido y se le exrtae el uid
        
        // Leer el usuario que corresponde al uid
        const usuario = await existeIdUsuario(uid)                      
        
        // Validacion de null
        if( !usuario){
            return res.status(401).json({
                ok: false,
                body: 'El usuario no existe'
            })
        }

        const {nombre, correo, uid_rol} = usuario
        
        // const estatusUsuario = await verificarEstatusActivo(usuario)        

        // //? Verifica si el usuario esta activo
        // if (!estatusUsuario) {
        //     return res.status(400).json({
        //         ok: false,
        //         body: "El estatus del usuario esta dado de baja, contacte con un administrador"
        //     })
        // }
    
        // Guardar el usuario        
        req.usuario = {nombre, correo, uid_rol, uid} // Se le manda el uid por el request para los siguientes controladores
        

        next()
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                ok: false,
                body: `Token expirado`
            });
        }

        res.status(401).json({
            ok: false,
            body: `Token no valido ${error.message}`
        })
    }    
}


module.exports = {
    validarJWT,
    validarJWTActivarCuenta,
    validarJWTReenviarcodigo
}