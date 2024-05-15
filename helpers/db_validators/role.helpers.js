const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {      
    Role,    
  } = require("../../models/index.models");

const getRole = async () => {


    try {
      let estatusActivo = new ObjectId('662857091815a1aa5532119a')
      const role = await Role.aggregate([
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
            nombre_estatus: { $arrayElemAt: ["$datos_estatus.nombre", 0] }, // Asume que el campo del nombre del estatus es 'nombre'              
            _id: 0,
            uid: "$_id",
            uid_estatus: { $arrayElemAt: ["$datos_estatus._id", 0] },
            modificado_por: { $arrayElemAt: ["$modificado_por.nombre", 0] },
            uid_modificado_por: { $arrayElemAt: ["$modificado_por._id", 0] }
          },
        },
      ])
      return role
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  }
  
  const getRolById = async (id) => {

    try {
      let estatusActivo = new ObjectId('662857091815a1aa5532119a')
      let idRol = new ObjectId(id)
      const query = await Role.aggregate([          
  
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

  const obtenerRolAdministrador = async () => {
    try {
      const rolAdministrador = await Role.findOne({ _id: '6629ceba69829e92a222735c' })
  
      return rolAdministrador
  
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  }

  const obtenerRolEmprendedor = async () => {
    try {
      const rolEmprendedor = await Role.findOne({ _id: '662c21c97b9e30d121ec7671' })
  
      return rolEmprendedor
  
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  }

  const verificarRolAdministrador = async (estatusVerificar = "") => {
    try {
      const estatusActivo = await Role.findById("6629ceba69829e92a222735c");
      const estatusBuscar = await Role.findById(estatusVerificar);
  
      if (estatusActivo._id.toString() !== estatusBuscar._id.toString()) {
        throw new Error(`Este tipo de usuario no puede realizar este cambio`);
      }
      return true;
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  };

  const verificarRolEmprendedor = async (estatusVerificar = "") => {
    try {
      const rolActivo = await Role.findById("662c21c97b9e30d121ec7671");
      const rolBuscar = await Role.findById(estatusVerificar);      
  
  
      if (rolActivo._id.toString() !== rolBuscar._id.toString()) {        
        throw new Error(`Este tipo de usuario no puede realizar este cambio`);
      }
      return true;
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  };

  const existeRol = async (role = "") => {
    try {
      const regex = new RegExp(role, "i");
  
      const existsRol = await Role.findOne({ nombre: regex });
  
      if (existsRol) {
        throw new Error(`El rol ${role} ya existe en la base de datos`);
      }
  
      return true;
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  };

  const obtenerRolNombre = async (role = "") => {
    try {
      const regex = new RegExp(role, "i");
  
      const existsRol = await Role.findOne({ nombre: regex });
  
  
      return existsRol;
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  };

  const existeIDRole = async (id = "") => {
    try {
      const existeRole = await Role.findById(id);
  
  
      if (!existeRole) {
        throw new Error(`El id ${id} no existe en la base de datos`);
      }
  
      return existeRole;
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  };

  const obtenerRolUsuario = async () => {
    try {
        const rolUsuario = await Role.findOne({ _id: '662c21e97b9e30d121ec7674' })
  
        return rolUsuario
  
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
  }

  const verificarRolUsuario = async (estatusVerificar = "") => {
    try {
        const rolActivo = await Role.findById("662c21e97b9e30d121ec7674");
        const rolBuscar = await Role.findById(estatusVerificar);
  
  
        if (rolActivo._id.toString() !== rolBuscar._id.toString()) {
            throw new Error(`Este tipo de usuario no puede realizar este cambio`);
        }
        return true;
    } catch (error) {
        throw new Error(
            `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
        );
    }
  };

  module.exports = {
    existeIDRole,
    existeRol,
    getRolById,
    getRole,
    obtenerRolAdministrador,
    obtenerRolEmprendedor,
    obtenerRolNombre,
    obtenerRolUsuario,
    verificarRolAdministrador,
    verificarRolEmprendedor,
    verificarRolUsuario,

  }
  
  