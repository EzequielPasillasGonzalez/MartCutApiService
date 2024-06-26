const { response } = require('express')
const { verificarRolAdministrador, verificarRolEmprendedor, verificarRolUsuario } = require('../helpers/index.helpers')

const esAdminRole = async (req, res = response, next) => {

    try {
        if (!req.usuario) {
            return res.status(400).json({
                ok: false,
                body: 'Se quiere verificar el rol primero, sin el token'
            })
        }

        const { uid_rol } = req.usuario

        await verificarRolAdministrador(uid_rol)



        next()
    } catch (error) {
        return res.status(500).json({
            ok: false,
            body: `${error.message}`
        })
    }
}

const esEmprendedorRol = async (req, res = response, next) => {

    try {
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                body: 'Se quiere verificar el rol primero, sin el token'
            })
        }

        const { uid_rol } = req.usuario


        await verificarRolEmprendedor(uid_rol)

        if (req.baseUrl.toString() === process.env.BASE_URL_USUARIO) {
            if (req.params.id !== req.usuario.uid) {
                return res.status(400).json({
                    ok: false,
                    body: 'El usuario no tiene privilegios necesarios'
                })
            }
        }

        next()
    } catch (error) {
        return res.status(500).json({
            ok: false,
            body: `${error.message}`
        })
    }


}

const esEmprendedorRolRecursivo = async (req, res = response, next) => {

    try {
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                body: 'Se quiere verificar el rol primero, sin el token'
            })
        }

        const { uid_rol } = req.usuario

        const resp = await verificarRolEmprendedor(uid_rol.toString())

        if (req.baseUrl.toString() === process.env.BASE_URL_USUARIO) {
            if (req.params.id !== req.usuario.uid) {
                return res.status(400).json({
                    ok: false,
                    body: 'El usuario no tiene privilegios necesarios'
                })
            }
        }        
        
        // if (req.baseUrl.toString() === process.env.BASE_URL_EMPRENDIMIENTO) {
            
        //     if (resp === true) {                
        //         const { uid_usuario_emprendedor } = req.emprendimiento                
        //         if(uid_usuario_emprendedor){
        //             if (req.usuario.uid !== uid_usuario_emprendedor.toString()) {                
        //                 throw new Error('No tienes permiso para modificar este emprendimiento.');
        //             }
        //         }else{
        //             return next()
        //         }                                
        //     }            
        // }





        if (resp === true) {            
            return next()
        }


    } catch (error) {
        // return res.status(500).json ({
        //     ok: false,
        //     body: `${error.message}`
        // }) 
        return esAdminRole(req, res, next);
    }


}

const esUsuarioRolRecursivo = async (req, res = response, next) => {

    try {
        if (!req.usuario) {
            return res.status(500).json({
                ok: false,
                body: 'Se quiere verificar el rol primero, sin el token'
            })
        }

        const { uid_rol } = req.usuario

        const resp = await verificarRolUsuario(uid_rol)

        if (req.baseUrl.toString() === process.env.BASE_URL_USUARIO) {
            if (req.params.id !== req.usuario.uid) {
                return res.status(400).json({
                    ok: false,
                    body: 'El usuario no tiene privilegios necesarios'
                })
            }
        }

        if (resp === true) {

            return next()
        }
    } catch (error) {
        // return res.status(500).json ({
        //     ok: false,
        //     body: `${error.message}`
        // }) 
        return esEmprendedorRolRecursivo(req, res, next);
    }


}

const tieneRoleValido = (req, res = response, next) => { // Se reciben los argumentos


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
    esUsuarioRolRecursivo,
    esEmprendedorRolRecursivo,
    tieneRoleValido,
    esEmprendedorRol,
}