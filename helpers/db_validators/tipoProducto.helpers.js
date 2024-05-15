const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
    TipoProucto,
} = require("../../models/index.models");

const getTipoProductoById = async (id) => {

    try {
        let estatusActivo = new ObjectId('662857091815a1aa5532119a')
        let idRol = new ObjectId(id)
        const query = await TipoProucto.aggregate([
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
                $match: {
                  $and: [
                    {_id: idRol},
                    {"datos_estatus._id": estatusActivo} // o 'inactivo'
                  ]                
                }
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

const getTipoProducto = async () => {

    try {
        let estatusActivo = new ObjectId('662857091815a1aa5532119a')
        const query = await TipoProucto.aggregate([
            {
                $lookup: {
                    from: "estatus",
                    localField: "uid_estatus",
                    foreignField: "_id",
                    as: "datos_estatus",
                },
            },
            {
                $match: {
                  "datos_estatus._id": estatusActivo
                }
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




const existeIdTipoProducto = async (id = "") => {
    try {
        const existeCategory = await TipoProucto.findById(id);

        if (!existeCategory) {
            throw new Error(`El id ${id} no existe en la base de datos`);
        }

        return true;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
};

const idTipoProductoExiste = async (id = "") => {
    try {

        const existsnombre = await TipoProucto.findOne();

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

const nombreTipoProductoExiste = async (nombre = "") => {
    try {
        if (nombre) {
            const regex = new RegExp(nombre, "i");

            const existsnombre = await TipoProucto.findOne({ nombre: regex });

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

const nombreTipoProductoExisteProduct = async (nombre = "") => {
    try {
        const existsnombre = await TipoProucto.findOne({ nombre });

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


const buscarCategoriaModificarProducto = async (category = "") => {
    try {
        const categoria = await TipoProucto.findOne({ nombre: category });

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

const buscarCategoria = async (category = "") => {
    try {
        const categoria = await TipoProucto.find({ nombre: category });

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
    buscarCategoria,
    buscarCategoriaModificarProducto,
    existeIdTipoProducto,
    nombreTipoProductoExiste,
    nombreTipoProductoExisteProduct,
    getTipoProducto,
    idTipoProductoExiste,
    getTipoProductoById,
};
