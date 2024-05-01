const {
  Estatus,
  Usuario,
  CentroUniversitario,
  Producto,
  Role,
  Emprendimiento,
  TipoEmprendimiento,
  TipoProucto,
} = require("../models/index.models");

const getEstaus = async () => {
  
  try {
    const estatus = await Estatus.find()  

    return estatus
  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const getUsuarios = async () => {
  
  try {
    const usuarios = await Usuario.find()  

    return usuarios
  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerRolAdministrador   = async () => {
  try {
    const rolAdministrador = await Role.findOne({ _id: '6629ceba69829e92a222735c' })            

    return rolAdministrador

  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerRolEmprendedor   = async () => {
  try {
    const rolEmprendedor = await Role.findOne({ _id: '662c21c97b9e30d121ec7671' })            

    return rolEmprendedor

  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerRolUsuario   = async () => {
  try {
    const rolUsuario = await Role.findOne({ _id: '662c21e97b9e30d121ec7674' })            

    return rolUsuario

  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerEstatusPausado = async () => {
  try {
    const estatusPausado = await Estatus.findOne({ _id: '6631807a231179dc53ddc852' })            

    return estatusPausado

  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerEstatusInactivo = async () => {
  try {
    const estatusInactivo = await Estatus.findOne({ _id: '66286a4e387f975b640c2368' })            

    return estatusInactivo

  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerEstatusNombre = async (nombre = '') => {
  try {

    const regex = new RegExp(nombre, "i");

    const estatusNombre = await Estatus.findOne({ nombre: regex })            

    return estatusNombre

  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerEstatusActivo = async () => {
  try {
    const estatusActivo = await Estatus.findOne({ _id: '662857091815a1aa5532119a' })            

    return estatusActivo

  } catch(error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

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
    const nombreCentroUniversitario = CentroUniversitario.findOne({ nombre });

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

const verificarExisteNombreCentroUniversitario = async (nombre = "") => {
  try {
    const nombreCentroUniversitario = CentroUniversitario.findOne({ nombre });

    if (nombreCentroUniversitario) {
      throw new Error(
        `El nombre del Centro universitario ya existe en la Base de Datos`
      );
    }

    return nombreCentroUniversitario;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const verificarEstatusActivo = async (objetoVerificar = "") => {
  try {
    const estatusActivo = await Estatus.findById("662857091815a1aa5532119a");
    const estatusBuscar = await Estatus.findById(objetoVerificar.uid_estatus);

    if (estatusActivo._id.toString() !== estatusBuscar._id.toString()) {
      throw new Error(`El estatus de ${objetoVerificar.nombre} es inactivo`);
    }
    return true;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

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

// const esRoleValido = async (role = '') => {
//     const existeRol = await Role.findOne({role})
//     if(!existeRol){
//         throw new Error(`El rol ${role} no existe en la base de datos`)
//     }
// }

const emailExiste = async (correo = "") => {
  try {
    const regex = new RegExp(correo, "i");

    const existsEmail = await Usuario.findOne({ correo: regex });

    if (existsEmail) {
      throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }

    return true;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const celularExiste = async (celular = "") => {
  try {
    const regex = new RegExp(celular, "i");

    const existsCelular = await Usuario.findOne({ celular: regex });

    if (existsCelular) {
      throw new Error(`El celular ${celular} ya existe en la base de datos`);
    }

    return true;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const existeIdUsuario = async (id = "") => {
  try {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
      throw new Error(`El id ${id} no existe en la base de datos`);
    }

    return existeUsuario;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const existeIDEstatus = async (id = "") => {
  try {
    const existeEstatus = await Estatus.findById(id);

    if (!existeEstatus) {
      throw new Error(`El id ${id} no existe en la base de datos`);
    }
    return true;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

// const nombreesEmprendedorRol = async (role = '') => {
//     const nombreValido = role.endsWith('_role')

//     if (!nombreValido) {
//         throw new Error('El nombre debe de contener _role al final para que sea valido')
//     }
// }

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

const existeEstatusNombre = async (nombre = "") => {
  try {
    const regex = new RegExp(nombre, "i");

    const existsRol = await Estatus.findOne({ nombre: regex });    

    if (existsRol) {
      throw new Error(`El estatus ${nombre} ya existe en la base de datos`);
    }

    return true;
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

const nombreTipoProductoExiste = async (nombre = "") => {
  try {
    const regex = new RegExp(nombre, "i");

    const existsnombre = await TipoProucto.findOne({ nombre: regex });

    if (existsnombre) {
      throw new Error(`La categoria ${nombre} ya existe en la base de datos`);
    }

    return true;
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

const existeIDProduct = async (id = "") => {
  try {
    const existeIdProducto = await Producto.findById(id);

    if (!existeIdProducto) {
      throw new Error(`El id ${id} no existe en la base de datos`);
    }

    return true;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const buscarCorreoUserModify = async (correo = "") => {
  try {
    const existsEmail = await Usuario.findOne({ correo });

    if (!existsEmail) {
      throw new Error(`El correo ${correo} no existe en la base de datos`);
    }

    return existsEmail;
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

    // const verificarEstatus = await verificarEstatusActivo(categoria)

    // if(verificarEstatus !== true){
    // }

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

    // const verificarEstatus = await verificarEstatusActivo(categoria)

    // if(verificarEstatus !== true){
    //     throw new Error(`LA categoria esta dada de baja`)
    // }
    return categoria;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

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
  // esRoleValido,
  // nombreProductExiste,
  // nombreesEmprendedorRol,
  buscarAbreviaturaCentroUniversitario,
  buscarCategoria,
  buscarCategoriaModificarProducto,
  buscarCorreoUserModify,
  buscarIdCentroUniversitario,
  buscarIdEmprendimiento,
  buscarIdTipoEmprendimiento,
  buscarNombreCentroUniversitario,
  buscarNombreEmprendimiento,
  buscarNombreTipoEmprendimiento,
  coleccionesPermitidas,
  emailExiste,
  existeIDEstatus,
  existeIDProduct,
  existeIDRole,
  existeIdTipoProducto,
  existeIdUsuario,
  existeRol,
  nombreTipoProductoExiste,
  nombreTipoProductoExisteProduct,
  verificarEstatusActivo,
  verificarExisteNombreCentroUniversitario,
  verificarExisteNombreEmprendimiento,
  verificarExisteNombreEmprendimiento,
  verificarRolAdministrador,
  verificarRolEmprendedor,
  verificarRolUsuario,
  obtenerRolUsuario,
  obtenerEstatusActivo,
  obtenerRolAdministrador,
  obtenerRolEmprendedor,
  celularExiste,
  verificarExisteNombreTipoEmprendimiento,
  getUsuarios,
  getEstaus,
  obtenerEstatusPausado,
  obtenerEstatusInactivo,
  obtenerEstatusNombre,
  existeEstatusNombre
};
