const { response } = require("express");

const { Emprendimiento } = require('../models/index.models');
const { obtenerEstatusActivo } = require("../helpers/db_validators/estatus.helpers");

const createEmprendimiento = async (req, res = response) => {
    try {
        const { ...resto } = req.body

        const usuario = req.usuario

        const createDate = new Date()

        const estatusActivo = await obtenerEstatusActivo()

        const emprendimiento = new Emprendimiento(...resto)

        console.log(emprendimiento);

        return res.status(200).json({
            ok: true,
            body: {usuario, ...resto}
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`
        })
    }
}

module.exports = {
    createEmprendimiento
}