const { response } = require('express')

const esAdminRole = ( req, res = response, next) => {    
    if(!req.usuario){
        return res.status(500).json({
            ok: false,
            body: 'Se quiere verificar el rol primero, sin el token'
        })
    }

    const { role, nombre} = req.usuario

    if( role !== 'Admin_role'){
        return res.status(401).json({
            ok: false,
            body: `${nombre} no tiene el rol requerido`
        });        
    }

    next()
}

const tieneRole = ( ...roles ) =>{ // Se reciben los argumentos

    return ( req, res = response, next) =>{

        if(!req.usuario){
            return res.status(500).json({
                ok: false,
                body: 'Se quiere verificar el rol primero, sin el token'
            })
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                ok: false,
                body: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next()
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}