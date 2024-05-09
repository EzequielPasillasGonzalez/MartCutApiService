const { response, request } = require('express');
const bcryptjs = require('bcryptjs')

const { Usuario } = require('../models/index.models')

const validarCodigo = async (req = request, res = response, next) => {
    try {
        const { codigo } = req.body
        if (!codigo) {
            return res.json({
                ok: false,
                body: 'No hay codigo para verificar'
            })
        }


        const uidUsuario = req.usuario.uid


        const codigoVerficacionString = codigo.toString()


        const usuario = await Usuario.findById(uidUsuario)

        //Verifica el codigo
        const codigo_validate = bcryptjs.compareSync(codigoVerficacionString, usuario.codigo_verificacion)

        if (!codigo_validate) {

            return res.json({
                ok: false,
                body: 'El codigo no es correcto'
            })
        }


        next()

    } catch (error) {
        res.json({
            ok: false,
            body: error.message
        })
    }
}

module.exports = {
    validarCodigo
}