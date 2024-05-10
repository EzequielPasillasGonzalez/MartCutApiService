const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
    TipoEntrega
} = require("../../models/index.models");

const getTipoEntregaById = async (id) => {

    try {
        const query = await TipoEntrega.aggregate([
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
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] }
                },
            },
        ])

        return query
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
}

const getTipoEntregaHelper = async () => {

    try {
        const query = await TipoEntrega.aggregate([
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
                    _id: 0,
                    uid: "$_id",
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] }
                },
            },
        ])

        return query
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
}




const existeIdTipoEntrega = async (id = "") => {
    try {
        const existeTipoEntrega = await TipoEntrega.findById(id);

        if (!existeTipoEntrega) {
            throw new Error(`El id ${id} no existe en la base de datos`);
        }

        return true;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const idTipoEntregaExiste = async (id = "") => {
    try {

        const existsnombre = await TipoEntrega.findOne();

        if (existsnombre) {
            throw new Error(`La id ${id} no existe en la base de datos`);
        }

        return true;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const nombreTipoEntregaExiste = async (nombre = "") => {
    try {
        if (nombre) {
            const regex = new RegExp(nombre, "i");

            const existsnombre = await TipoEntrega.findOne({ nombre: regex });

            if (existsnombre) {
                throw new Error(`La categoria ${nombre} ya existe en la base de datos`);
            }

            return true;
        }

    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const nombreTipoEntregaExisteProducto = async (nombre = "") => {
    try {
        const existsnombre = await TipoEntrega.findOne({ nombre });

        if (!existsnombre) {
            throw new Error(`La categoria ${nombre} no existe en la base de datos`);
        }

        return existsnombre;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};


const buscarTipoEntregaProducto = async (category = "") => {
    try {
        const categoria = await TipoEntrega.findOne({ nombre: category });

        if (!categoria) {
            throw new Error(`La categoria ${category} no existe en la base de datos`);
        }

        return categoria;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const buscarTipoEntrega = async (category = "") => {
    try {
        const categoria = await TipoEntrega.find({ nombre: category });

        if (!categoria) {
            throw new Error(`La categoria ${category} no existe en la base de datos`);
        }

        return categoria;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

module.exports = {
    getTipoEntregaById,
    getTipoEntregaHelper,
    existeIdTipoEntrega,
    idTipoEntregaExiste,
    nombreTipoEntregaExiste,
    nombreTipoEntregaExisteProducto,
    buscarTipoEntregaProducto,
    buscarTipoEntrega
};
