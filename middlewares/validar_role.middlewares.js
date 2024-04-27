const { response } = require('express')
const { verificarRolAdministrador, verificarRolEmprendedor } = require('../helpers/db_validators.helpers')

const esAdminRole = async ( req, res = response, next) => {    

    try {
        if(!req.usuario){
            return res.status(400).json({
                ok: false,
                body: 'Se quiere verificar el rol primero, sin el token'
            })
        }
    
        const { uid_rol} = req.usuario        

        await verificarRolAdministrador(uid_rol)        
    
    
       
        next()        
    } catch(error) {        
        return res.status(500).json ({
                ok: false,
                body: `${error.message}`
            })                    
    }
}

const esEmprendedorRol = async ( req, res = response, next) => {   
    
    try {
        if(!req.usuario){
            return res.status(500).json ({            
                ok: false,
                body: 'Se quiere verificar el rol primero, sin el token'
            })
        }
    
        const { uid_rol} = req.usuario
    
        await verificarRolEmprendedor(uid_rol)
    
        next()
    } catch(error) {
        // return res.status(500).json ({
        //     ok: false,
        //     body: `${error.message}`
        // }) 
        return esAdminRole(req, res, next);
    }

    
}

const tieneRoleValido = ( req, res = response, next ) =>{ // Se reciben los argumentos
                                                
        
        // if(!roles.includes(req.usuario.role)){
        //     return res.status(401).json({
        //         ok: false,
        //         body: `El servicio requiere uno de estos roles ${roles}`
        //     })
        // }

        next()    

}

module.exports = {
    esAdminRole,
    esEmprendedorRol,
    tieneRoleValido
}