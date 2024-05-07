const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
    Usuario,
} = require("../../models/index.models");

const getUsuariosId = async (id) => {

    try {

        const usuarios = await Usuario.aggregate([
            {
                $match: {
                    _id: new ObjectId(id) // Usa 'new' para crear una nueva instancia de ObjectId
                }
            },
            {
                $lookup: {
                    from: "estatus",
                    localField: "uid_estatus",
                    foreignField: "_id",
                    as: "datos_estatus",
                },
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "uid_rol",
                    foreignField: "_id",
                    as: "datos_rol",
                },
            },
            {
                $lookup: {
                    from: "usuarios",
                    localField: "uid_modificado_por",
                    foreignField: "_id",
                    as: "modificado_por",
                },
            },
            {
                $project: {
                    nombre: 1,
                    _id: 0,
                    uid: "$_id",
                    apellido_paterno: 1,
                    apellido_materno: 1,
                    correo: 1,
                    celular: 1,
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    nombre_rol: { $arrayElemAt: ["$datos_rol.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_rol: { $arrayElemAt: ["$datos_rol._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] }

                },
            },
        ])

        return usuarios
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
}

const getUsuariosNombre = async (nombre) => {

    try {

        const regex = new RegExp(nombre, "i");

        const usuarios = await Usuario.aggregate([
            {
                $match: {
                    nombre: regex  // Usa 'new' para crear una nueva instancia de ObjectId
                }
            },
            {
                $lookup: {
                    from: "estatus",
                    localField: "uid_estatus",
                    foreignField: "_id",
                    as: "datos_estatus",
                },
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "uid_rol",
                    foreignField: "_id",
                    as: "datos_rol",
                },
            },
            {
                $lookup: {
                    from: "usuarios",
                    localField: "uid_modificado_por",
                    foreignField: "_id",
                    as: "modificado_por",
                },
            },
            {
                $project: {
                    nombre: 1,
                    _id: 0,
                    uid: "$_id",
                    apellido_paterno: 1,
                    apellido_materno: 1,
                    correo: 1,
                    celular: 1,
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    nombre_rol: { $arrayElemAt: ["$datos_rol.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_rol: { $arrayElemAt: ["$datos_rol._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] }
                },
            },
        ])

        return usuarios
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
}

const getUsuarios = async () => {

    try {

        const usuarios = await Usuario.aggregate([
            {
                $lookup: {
                    from: "estatus",
                    localField: "uid_estatus",
                    foreignField: "_id",
                    as: "datos_estatus",
                },
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "uid_rol",
                    foreignField: "_id",
                    as: "datos_rol",
                },
            },
            {
                $project: {
                    nombre: 1,
                    _id: 0,
                    uid: "$_id",
                    apellido_paterno: 1,
                    apellido_materno: 1,
                    correo: 1,
                    celular: 1,
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    nombre_rol: { $arrayElemAt: ["$datos_rol.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_rol: { $arrayElemAt: ["$datos_rol._id", 0] },

                },
            },
        ])

        return usuarios
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
}




const emailExiste = async (correo = "") => {
    try {
        const regex = new RegExp(correo, "i");

        const existsEmail = await Usuario.findOne({ correo: regex });

        if (existsEmail) {
            throw new Error(`El correo ${correo} ya existe en la base de datos`);
        }

        return true;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const celularExiste = async (celular = "") => {
    try {
        const regex = new RegExp(celular, "i");

        const existsCelular = await Usuario.findOne({ celular: regex });

        if (existsCelular) {
            throw new Error(`El celular ${celular} ya existe en la base de datos`);
        }

        return true;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const existeIdUsuario = async (id = "") => {
    try {
        const existeUsuario = await Usuario.findById(id);

        if (!existeUsuario) {
            throw new Error(`El id ${id} no existe en la base de datos`);
        }

        return existeUsuario;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const buscarCorreoUserModify = async (correo = "") => {
    try {
        const existsEmail = await Usuario.findOne({ correo });

        if (!existsEmail) {
            throw new Error(`El correo ${correo} no existe en la base de datos`);
        }

        return existsEmail;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};


module.exports = {
    buscarCorreoUserModify,
    celularExiste,
    emailExiste,
    existeIdUsuario,
    getUsuarios,
    getUsuariosId,
    getUsuariosNombre,
}
