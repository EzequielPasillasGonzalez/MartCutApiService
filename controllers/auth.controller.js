const {response} = require('express');
const bcryptjs = require('bcryptjs');

const { Usuario, Estatus } = require('../models/index.models')
const { generarJWT, googleVerify } = require('../helpers/index.helpers');


const login = async (req, res = response) => {    
    const { correo, password } = req.body

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo })

        

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                body: "La contraseña o el correo no es correcto"
            })
        }

        const estatusDB = await Estatus.findOne({ _id: '662857091815a1aa5532119a' })            
        const estatusUsuario = await Estatus.findOne({ _id: usuario.uid_estatus })   
                   
        // Verifica si el usuario esta activo
        if (estatusUsuario.nombre != estatusDB.nombre) {            
            return res.status(400).json({
                ok: false,
                body: "El estatus del usuario esta dado de baja, contacte con un administrador"
            })
        }

        // Verficar la contraseña
        const password_validate = bcryptjs.compareSync(password, usuario.password)

        if (!password_validate) {
            return res.status(400).json({
                ok: false,
                body: "La contraseña o el correo no es correcto"
            })
        }

        // Generar el JWT - Token
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            body: {usuario,
            token}
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            body: `Hable con el administrador, problemas del servidor ${error.message}`
        })
    }
    
}

const renovarToken = async (req, res = response) => {

    const { usuario } = req

    // Generar el JWT - Token
    const token = await generarJWT(usuario.uid)

    res.json({
        ok: true,
        body: {
            usuario,
            token
        }
    })

}

const googleSigIn = async (req, res = response) => {

    const { id_token } = req.body

    try {

        const { nombre, img, correo } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if (!usuario) {
            // si no existe, se crea el usuario
            const data = {
                nombre,
                correo,
                password: '',
                img,
                google: true,
                role: 'User_role'
            }

            usuario = new Usuario(data)

            await usuario.save()
        }

        // Si el usuario existe en DB
        if (!usuario.state) {
            return res.status(401).json({
                ok: false,
                body: "Usuario borrado, hable con el administrador"
            })
        }

        // Generar el JWT - Token
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            body: "Hubo un error con la validacion del token"
        })
    }
}




module.exports = {
    login,
    renovarToken,
    googleSigIn,    
}