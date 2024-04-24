const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { Usuario, Estatus } = require('../models/index.models')

const validarJWT = async (req = request, res = response, next) =>{
    const token = req.header('jwt_token') // Como se esepecifica aqui, es como el front-end lo tiene que enviar

    

    if(!token) {
        return res.status(401).json({
            ok: false,
            body: 'No hay token de autorizacion'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)  //Se verifica si el token es valido y se le exrtae el uid
        
        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid)                      
        
        // Validacion de null
        if( !usuario){
            return res.status(401).json({
                ok: false,
                body: 'El usuario no existe'
            })
        }

        const {nombre, correo, rol} = usuario

        const estatusDB = await Estatus.findOne({ _id: '662857091815a1aa5532119a' })
        const estatusUsuario = await Estatus.findOne({ _id: usuario.uuid_estatus })

        // Verifica si el usuario esta activo
        if (estatusUsuario.nombre != estatusDB.nombre) {
            return res.status(400).json({
                ok: false,
                body: "El estatus del usuario esta dado de baja, contacte con un administrador"
            })
        }
    
        // Guardar el usuario
        req.usuario = {nombre, correo, rol, uid} // Se le manda el uid por el request para los siguientes controladores

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
    validarJWT
}