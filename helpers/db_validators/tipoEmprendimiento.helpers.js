const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {          
    TipoEmprendimiento,    
  } = require("../../models/index.models");

  const buscarIdTipoEmprendimiento = async (id = "") => {
    try {
      const nombreTipoEmprendimiento = TipoEmprendimiento.findById(id);
  
      if (!nombreTipoEmprendimiento) {
        throw new Error(
          `El Tipo de Emprendimiento no existe en la Base de Datos`
        );
      }
  
      return nombreTipoEmprendimiento;
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  };

  const buscarNombreTipoEmprendimiento = async (nombre = "") => {
    try {
      const nombreTipoEmprendimiento = TipoEmprendimiento.findOne({ nombre });
  
      if (nombreTipoEmprendimiento) {
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
      const nombreTipoEmprendimiento = TipoEmprendimiento.findOne({ nombre });
  
      if (nombreTipoEmprendimiento) {
        throw new Error(
          `El nombre del Tipo de Emprendimiento ya existe en la Base de Datos`
        );
      }
  
      return nombreTipoEmprendimiento;
    } catch (error) {
      throw new Error(
        `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
      );
    }
  };

  module.exports = {
    buscarIdTipoEmprendimiento,
    buscarNombreTipoEmprendimiento,
    verificarExisteNombreTipoEmprendimiento,
  }