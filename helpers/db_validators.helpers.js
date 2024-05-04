const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {            
  TipoProucto,
} = require("../models/index.models");













































// const esRoleValido = async (role = '') => {
//     const existeRol = await Role.findOne({role})
//     if(!existeRol){
//         throw new Error(`El rol ${role} no existe en la base de datos`)
//     }
// }







// const nombreesEmprendedorRol = async (role = '') => {
//     const nombreValido = role.endsWith('_role')

//     if (!nombreValido) {
//         throw new Error('El nombre debe de contener _role al final para que sea valido')
//     }
// }







const coleccionesPermitidas = async (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, las permitidas son ${colecciones}`
    );
  }

  return true;
};






module.exports = {  

  coleccionesPermitidas,          
};
