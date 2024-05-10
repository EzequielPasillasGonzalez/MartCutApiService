const { response, request } = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const { CentroUniversitario } = require("../../models/index.models");

const buscarIdCentroUniversitario = async (id = "") => {
    try {
        const nombreCentroUniversitario = CentroUniversitario.findById(id);

        if (!nombreCentroUniversitario) {
            throw new Error(`El Centro universitario no existe en la Base de Datos`);
        }

        return nombreCentroUniversitario;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const buscarAbreviaturaCentroUniversitario = async (abreviado = "") => {
    try {
        const nombreCentroUniversitario = CentroUniversitario.findOne({
            abreviado,
        });

        if (nombreCentroUniversitario) {
            throw new Error(
                `El nombre del Centro universitario no existe en la Base de Datos`
            );
        }

        return nombreCentroUniversitario;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const buscarNombreCentroUniversitario = async (nombre = "") => {
    try {
        if (nombre) {
            const nombreCentroUniversitario = await CentroUniversitario.findOne({
                nombre,
            });
            if (!nombreCentroUniversitario) {
                throw new Error(
                    `El nombre del ${nombre} no existe en la Base de Datos`
                );
            }

            return nombreCentroUniversitario;
        }
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const verificarExisteNombreCentroUniversitario = async (nombre = "") => {
    try {
        if (nombre) {
            const nombreCentroUniversitario = CentroUniversitario.findOne({ nombre });

            if (nombreCentroUniversitario) {
                throw new Error(
                    `El nombre del Centro universitario ya existe en la Base de Datos`
                );
            }

            return nombreCentroUniversitario;
        }
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const getCentrosUniversitariosDB = async () => {
    try {
        const query = await CentroUniversitario.aggregate([
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
                    from: "usuarios",
                    localField: "uid_modificado_por",
                    foreignField: "_id",
                    as: "modificado_por",
                },
            },
            {
                $project: {
                    nombre: 1,
                    abreviado: 1,
                    domicilio: 1,
                    _id: 0,
                    uid: "$_id",
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
                },
            },
        ]);

        return query;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const getCentroUniversitarioById = async (id) => {
    try {
        const query = await CentroUniversitario.aggregate([
            {
                $match: {
                    _id: new ObjectId(id), // Usa 'new' para crear una nueva instancia de ObjectId
                },
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
                    from: "usuarios",
                    localField: "uid_modificado_por",
                    foreignField: "_id",
                    as: "modificado_por",
                },
            },
            {
                $project: {
                    _id: 0,
                    uid: "$_id", 
                    nombre: 1,
                    abreviado: 1,
                    domicilio: 1,                                       
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
                },
            },
        ]);

        return query;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const existeIdCentroUniversitario = async ( req = request, res = response, next ) => {
    try {
        const { id } = req.params;
        const existeCentroUniversitario = await getCentroUniversitarioById(id);
        if (!existeCentroUniversitario || existeCentroUniversitario.length === 0) {
            return res.status(400).json({
                ok: false,
                body: "No existe el ID",
            });
        }

        req.body.centroUniversitario = existeCentroUniversitario;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            body: error.message,
        });
    }
};

module.exports = {
    buscarAbreviaturaCentroUniversitario,
    buscarIdCentroUniversitario,
    buscarNombreCentroUniversitario,
    existeIdCentroUniversitario,
    verificarExisteNombreCentroUniversitario,
    getCentrosUniversitariosDB,
    getCentroUniversitarioById,
};
