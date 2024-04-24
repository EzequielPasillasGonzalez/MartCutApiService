const jwt = require('jsonwebtoken')

const { Usuario } = require('../models/index.models')

const generarJWT = (uid = '') =>{

    return new Promise(( resolve, reject) => {

        const payload = {uid}

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {            //Todo: fimrar un nuevo token
            expiresIn: '4h' //? Saberen cuanto tiempo expira
        }, (err, token) =>{
            
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        }) 

    })

}

const comprobarJWT = async (token = '') => {
    try {
        if (token.length < 10) {
            return null
        }                

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)        

        const usuario = await Usuario.findById(uid)

        if(usuario) {
            if(usuario){
                return usuario
            }else {
                return null
            }       
        } else {
            return null
        }

    } catch(error) {

        return null
        
    }
}

module.exports = {
    generarJWT,
    comprobarJWT
}