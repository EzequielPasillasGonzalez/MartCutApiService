const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {        
    Emprendimiento    
  } = require("../../models/index.models");

const buscarIdEmprendimiento = async (id = "") => {
    try {
      const nombreEmprendimiento = Emprendimiento.findById(id);
  
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
      const nombreEmprendimiento = Emprendimiento.findOne({ nombre });
  
      if (nombreEmprendimiento) {
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
      const nombreEmprendimiento = Emprendimiento.findOne({ nombre });
  
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

  module.exports = {
    buscarIdEmprendimiento,
    buscarNombreEmprendimiento,
    verificarExisteNombreEmprendimiento,
  }