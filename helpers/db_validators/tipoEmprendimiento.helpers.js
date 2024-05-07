const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
  TipoEmprendimiento,
} = require("../../models/index.models");

const getTipoEmprendimientoById = async (id) => {

  try {
    const query = await TipoEmprendimiento.aggregate([
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

const buscarNombreTipoEmprendimiento = async (nombre = "") => {
  try {
    const regex = new RegExp(nombre, "i");

    const nombreTipoEmprendimiento = await TipoEmprendimiento.findOne({ nombre: regex });
    if (!nombreTipoEmprendimiento) {
      throw new Error(
        `El nombre del Tipo de Emprendimiento no existe en la Base de Datos`
      );
    }

    return nombreTipoEmprendimiento;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const verificarExisteNombreTipoEmprendimiento = async (nombre = "") => {
  try {
    if (nombre) {
      const regex = new RegExp(nombre, "i");

      const nombreTipoEmprendimiento = await TipoEmprendimiento.findOne({ nombre: regex });

      if (nombreTipoEmprendimiento) {
        throw new Error(
          `El nombre de ${nombreTipoEmprendimiento.nombre} del Tipo de Emprendimiento ya existe en la Base de Datos`
        );
      }

      return nombreTipoEmprendimiento;
    }

  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const getTipoEmprendimiento = async () => {

  try {
    const query = await TipoEmprendimiento.aggregate([
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

const existeIdTipoEmprendimiento = async (id = "") => {
  try {
    const existeTipoEmprendimiento = await TipoEmprendimiento.findById(id);


    if (!existeTipoEmprendimiento) {
      throw new Error(`El id ${id} no existe en la base de datos`);
    }

    return true;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

module.exports = {
  getTipoEmprendimientoById,
  buscarNombreTipoEmprendimiento,
  verificarExisteNombreTipoEmprendimiento,
  getTipoEmprendimiento,
  existeIdTipoEmprendimiento
}