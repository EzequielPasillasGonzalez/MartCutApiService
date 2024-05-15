const { response, request } = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
  Emprendimiento
} = require("../../models/index.models");

const buscarIdEmprendimiento = async (id = "") => {
  try {
    const nombreEmprendimiento = await Emprendimiento.findById(id);

    if (!nombreEmprendimiento) {
      throw new Error(`El emprendimiento no existe en la Base de Datos`);
    }

    return nombreEmprendimiento;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const buscarNombreEmprendimiento = async (nombre = "") => {
  try {
    const regex = new RegExp(nombre, "i");
    const nombreEmprendimiento = await Emprendimiento.findOne({ nombre: regex });
    console.log(nombreEmprendimiento);

    if (!nombreEmprendimiento) {
      throw new Error(
        `El nombre del Emprendimiento no existe en la Base de Datos`
      );
    }

    return nombreEmprendimiento;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const verificarExisteNombreEmprendimiento = async (nombre = "") => {
  try {
    const regex = new RegExp(nombre, "i");
    const nombreEmprendimiento = await Emprendimiento.findOne({ regex });

    if (nombreEmprendimiento) {
      throw new Error(
        `El nombre del Emprendimiento ya existe en la Base de Datos`
      );
    }

    return nombreEmprendimiento;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const getEmprendimientos = async () => {

  try {

    let estatusActivo = new ObjectId('662857091815a1aa5532119a')
    const usuarios = await Emprendimiento.aggregate([
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
        $lookup: {
          from: "usuarios",
          localField: "uid_usuario_emprendedor",
          foreignField: "_id",
          as: "datos_usuario_emprendedor",
        },
      },
      {
        $lookup: {
          from: "tipo_entregas",
          localField: "uid_tipo_entrega",
          foreignField: "_id",
          as: "tipo_entrega",
        },
      },
      {
        $lookup: {
          from: "tipo_emprendimientos",
          localField: "uid_tipo_emprendimiento",
          foreignField: "_id",
          as: "tipo_emprendimiento",
        },
      },
      {
        $lookup: {
          from: "productos",
          localField: "uid_producto",
          foreignField: "_id",
          as: "lista_productos",
        },
      },
      {
        $lookup: {
          from: "centro_universitarios",
          localField: "uid_centro_universitario",
          foreignField: "_id",
          as: "lista_centros_universitarios",
        },
      },
      {
        $project: {
          nombre: 1,
          _id: 0,
          uid: "$_id",
          url_img: 1,
          nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
          uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
          modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
          uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
          nombre_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.nombre", 0] },
          uid_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor._id", 0] },
          tipos_entrega: {
            $map: {
              input: "$tipo_entrega",
              as: "entrega",
              in: {
                nombre: "$$entrega.nombre",
                uid: "$$entrega._id"

              }
            },
          },
          tipo_emprendimiento: { $arrayElemAt: ["$tipo_emprendimiento.nombre", 0] },
          lista_productos: {
            $map: {
              input: "$lista_productos",
              as: "productos",
              in: {
                nombre: "$$productos.nombre",
                uid: "$$productos._id"

              }
            }
          },
          lista_centros_universitarios: {
            $map: {
              input: "$lista_centros_universitarios",
              as: "centro",
              in: {
                nombre: "$$centro.nombre",
                uid: "$$centro._id"

              }
            }
          }
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

const getEmprendimientosById = async (id) => {

  try {

    let estatusActivo = new ObjectId('662857091815a1aa5532119a')
    let idEmprendimiento = new ObjectId(id)
    const usuarios = await Emprendimiento.aggregate([
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
            {_id: idEmprendimiento},
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
        $lookup: {
          from: "usuarios",
          localField: "uid_usuario_emprendedor",
          foreignField: "_id",
          as: "datos_usuario_emprendedor",
        },
      },
      {
        $lookup: {
          from: "tipo_entregas",
          localField: "uid_tipo_entrega",
          foreignField: "_id",
          as: "tipo_entrega",
        },
      },
      {
        $lookup: {
          from: "tipo_emprendimientos",
          localField: "uid_tipo_emprendimiento",
          foreignField: "_id",
          as: "tipo_emprendimiento",
        },
      },
      {
        $lookup: {
          from: "productos",
          localField: "uid_producto",
          foreignField: "_id",
          as: "lista_productos",
        },
      },
      {
        $lookup: {
          from: "centro_universitarios",
          localField: "uid_centro_universitario",
          foreignField: "_id",
          as: "lista_centros_universitarios",
        },
      },
      {
        $project: {
          nombre: 1,
          _id: 0,
          uid: "$_id",
          url_img: 1,
          nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
          uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
          modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
          uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
          nombre_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.nombre", 0] },
          uid_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor._id", 0] },
          tipos_entrega: {
            $map: {
              input: "$tipo_entrega",
              as: "entrega",
              in: {
                nombre: "$$entrega.nombre",
                uid: "$$entrega._id"

              }
            },
          },
          tipo_emprendimiento: { $arrayElemAt: ["$tipo_emprendimiento.nombre", 0] },
          lista_productos: {
            $map: {
              input: "$lista_productos",
              as: "productos",
              in: {
                nombre: "$$productos.nombre",
                uid: "$$productos._id"

              }
            }
          },
          lista_centros_universitarios: {
            $map: {
              input: "$lista_centros_universitarios",
              as: "centro",
              in: {
                nombre: "$$centro.nombre",
                uid: "$$centro._id"

              }
            }
          }
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

const existeIdEmprendimiento = async (req = request, res = response, next) => {
  try {
    const id = req.params.id
    const existeEmprendimiento = await Emprendimiento.findById(id);


    if (!existeEmprendimiento) {
      return res.json({
        ok: false,
        body: `El id ${id} no existe en la base de datos`
      })
    }

    req.emprendimiento = existeEmprendimiento
    next()
  } catch (error) {
    res.json({
      ok: false,
      body: `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    })
  }
};


module.exports = {
  buscarIdEmprendimiento,
  buscarNombreEmprendimiento,
  verificarExisteNombreEmprendimiento,
  getEmprendimientos,
  existeIdEmprendimiento,
  getEmprendimientosById
}