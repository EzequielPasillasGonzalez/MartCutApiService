const { response, request } = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {        
    Producto    
  } = require("../../models/index.models");

const buscarIdEmprendimiento = async (id = "") => {
    try {
      const nombreEmprendimiento = await Producto.findById(id);
  
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
      const nombreEmprendimiento = await Producto.findOne({ nombre: regex });   
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
      const nombreEmprendimiento = await Producto.findOne({ regex });
  
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


  const getProductosPorNombre = async (nombre = "") => {

    try {

      const regex = new RegExp(nombre, "i");
      let estatusActivo = new ObjectId('662857091815a1aa5532119a')
        const usuarios = await Producto.aggregate([
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
                  {nombre: regex},
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
                from: "tipo_productos",
                localField: "uid_tipo_producto",
                foreignField: "_id",
                as: "tipo_producto",
              },
            },   
            {
              $lookup: {
                from: "emprendimientos",
                localField: "datos_usuario_emprendedor.uid_emprendimiento",
                foreignField: "_id",
                as: "datos_emprendimiento",
              },
            },  
            {
              $lookup: {
                from: "tipo_entregas",
                localField: "datos_emprendimiento.uid_tipo_entrega",
                foreignField: "_id",
                as: "datos_tipo_entrega",
              },
            }, 
            {
              $lookup: {
                from: "centro_universitarios",
                localField: "datos_emprendimiento.uid_centro_universitario",
                foreignField: "_id",
                as: "datos_centro_universitario",
              },
            },                  
            {
                $project: {
                    nombre: 1,
                    _id: 0,
                    uid: "$_id",
                    url_img: 1,   
                    precio: 1,
                  cantidad: 1,
                  descripcion: 1,                 
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
                    nombre_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.nombre", 0] },
                    celular_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.celular", 0] },
                    uid_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor._id", 0] },
                    tipo_producto: { $arrayElemAt: ["$tipo_producto.nombre", 0] },
                    nombre_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento.nombre", 0] },
                    uid_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento._id", 0] },
                    datos_tipo_entrega: {
                      $map: {
                        input: "$datos_tipo_entrega",
                        as: "entrega",
                        in: {
                            nombre: "$$entrega.nombre",                              
                            uid: "$$entrega._id"
                            
                        }
                    }
                    },                    
                    datos_centro_universitario: {
                      $map: {
                          input: "$datos_centro_universitario",
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

  const getProductos = async () => {

    try {

      let estatusActivo = new ObjectId('662857091815a1aa5532119a')
        const usuarios = await Producto.aggregate([
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
                from: "tipo_productos",
                localField: "uid_tipo_producto",
                foreignField: "_id",
                as: "tipo_producto",
              },
            },   
            {
              $lookup: {
                from: "emprendimientos",
                localField: "datos_usuario_emprendedor.uid_emprendimiento",
                foreignField: "_id",
                as: "datos_emprendimiento",
              },
            },  
            {
              $lookup: {
                from: "tipo_entregas",
                localField: "datos_emprendimiento.uid_tipo_entrega",
                foreignField: "_id",
                as: "datos_tipo_entrega",
              },
            }, 
            {
              $lookup: {
                from: "centro_universitarios",
                localField: "datos_emprendimiento.uid_centro_universitario",
                foreignField: "_id",
                as: "datos_centro_universitario",
              },
            },                  
            {
                $project: {
                    nombre: 1,
                    _id: 0,
                    uid: "$_id",
                    url_img: 1, 
                    precio: 1,
                  cantidad: 1,
                  descripcion: 1,                   
                    nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                    uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                    modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                    uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
                    nombre_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.nombre", 0] },
                    celular_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.celular", 0] },
                    uid_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor._id", 0] },
                    tipo_producto: { $arrayElemAt: ["$tipo_producto.nombre", 0] },
                    nombre_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento.nombre", 0] },
                    uid_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento._id", 0] },
                    datos_tipo_entrega: {
                      $map: {
                        input: "$datos_tipo_entrega",
                        as: "entrega",
                        in: {
                            nombre: "$$entrega.nombre",                              
                            uid: "$$entrega._id"
                            
                        }
                    }
                    },                    
                    datos_centro_universitario: {
                      $map: {
                          input: "$datos_centro_universitario",
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

const getProductosLimpios = async () => {

  try {

      const usuarios = await Producto.aggregate([
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
              from: "tipo_productos",
              localField: "uid_tipo_producto",
              foreignField: "_id",
              as: "tipo_producto",
            },
          },   
          {
            $lookup: {
              from: "emprendimientos",
              localField: "datos_usuario_emprendedor.uid_emprendimiento",
              foreignField: "_id",
              as: "datos_emprendimiento",
            },
          },  
          {
            $lookup: {
              from: "tipo_entregas",
              localField: "datos_emprendimiento.uid_tipo_entrega",
              foreignField: "_id",
              as: "datos_tipo_entrega",
            },
          }, 
          {
            $lookup: {
              from: "centro_universitarios",
              localField: "datos_emprendimiento.uid_centro_universitario",
              foreignField: "_id",
              as: "datos_centro_universitario",
            },
          },                  
          {
              $project: {
                  nombre: 1,
                  _id: 0,
                  uid: "$_id",
                  url_img: 1,                    
                  precio: 1,
                  cantidad: 1,
                  descripcion: 1,
                  nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
                  uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
                  modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
                  uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
                  nombre_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.nombre", 0] },
                  celular_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.celular", 0] },
                  uid_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor._id", 0] },
                  tipo_producto: { $arrayElemAt: ["$tipo_producto.nombre", 0] },
                  nombre_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento.nombre", 0] },
                  uid_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento._id", 0] },
                  datos_tipo_entrega: {
                    $map: {
                      input: "$datos_tipo_entrega",
                      as: "entrega",
                      in: {
                          nombre: "$$entrega.nombre",                              
                          uid: "$$entrega._id"
                          
                      }
                  }
                  },                    
                  datos_centro_universitario: {
                    $map: {
                        input: "$datos_centro_universitario",
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


const getProductosById = async (id) => {

  try {

    let estatusActivo = new ObjectId('662857091815a1aa5532119a')
      const usuarios = await Producto.aggregate([
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
            {_id: id},
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
          from: "tipo_productos",
          localField: "uid_tipo_producto",
          foreignField: "_id",
          as: "tipo_producto",
        },
      },   
      {
        $lookup: {
          from: "emprendimientos",
          localField: "datos_usuario_emprendedor.uid_emprendimiento",
          foreignField: "_id",
          as: "datos_emprendimiento",
        },
      },  
      {
        $lookup: {
          from: "tipo_entregas",
          localField: "datos_emprendimiento.uid_tipo_entrega",
          foreignField: "_id",
          as: "datos_tipo_entrega",
        },
      }, 
      {
        $lookup: {
          from: "centro_universitarios",
          localField: "datos_emprendimiento.uid_centro_universitario",
          foreignField: "_id",
          as: "datos_centro_universitario",
        },
      },                  
      {
          $project: {
              nombre: 1,
              _id: 0,
              uid: "$_id",
              url_img: 1,   
              precio: 1,
            cantidad: 1,
            descripcion: 1,                 
              nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'                            
              uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
              modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
              uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] },
              nombre_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.nombre", 0] },
              celular_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor.celular", 0] },
              uid_usuario_emprendedor: { $arrayElemAt: ["$datos_usuario_emprendedor._id", 0] },
              tipo_producto: { $arrayElemAt: ["$tipo_producto.nombre", 0] },
              nombre_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento.nombre", 0] },
              uid_emprendimiento: { $arrayElemAt: ["$datos_emprendimiento._id", 0] },
              datos_tipo_entrega: {
                $map: {
                  input: "$datos_tipo_entrega",
                  as: "entrega",
                  in: {
                      nombre: "$$entrega.nombre",                              
                      uid: "$$entrega._id"
                      
                  }
              }
              },                    
              datos_centro_universitario: {
                $map: {
                    input: "$datos_centro_universitario",
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

const existeIDProduct = async (req = request, res = response, next) => {
  try {
    const id = req.params.id
    const existeProducto = await Producto.findById(id);



    if (!existeProducto) {      
      return res.json({
        ok: false,
        body: `El id ${id} no existe en la base de datos`
    })
    }

    req.producto = existeProducto
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
    getProductos,
    existeIDProduct,
    getProductosById,
    getProductosLimpios,
    getProductosPorNombre
  }