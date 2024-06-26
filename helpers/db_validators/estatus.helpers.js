const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
  Estatus,
} = require("../../models/index.models");

const getEstaus = async () => {

  try {
    const estatus = await Estatus.find()

    return estatus
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerEstatusPausado = async () => {
  try {
    const estatusPausado = await Estatus.findOne({ _id: '6631807a231179dc53ddc852' })

    return estatusPausado

  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerEstatusBaja = async () => {
  try {
    const estatusPausado = await Estatus.findOne({ _id: '663bd399779a3dfa62327e28' })

    return estatusPausado

  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

const obtenerEstatusInactivo = async () => {
  try {
    const estatusInactivo = await Estatus.findOne({ _id: '66286a4e387f975b640c2368' })

    return estatusInactivo

  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}
const obtenerEstatusActivo = async () => {
  try {
    const estatusActivo = await Estatus.findOne({ _id: '662857091815a1aa5532119a' })

    return estatusActivo

  } catch (error) {
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

  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
}

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

const validaEstatusActivo = async (objetoVerificar = "") => {
  try {
    const estatusActivo = await Estatus.findById("662857091815a1aa5532119a");
    const estatusBuscar = await Estatus.findById(objetoVerificar.uid_estatus);

    if (estatusActivo._id.toString() !== estatusBuscar._id.toString()) {
      return false
    }
    return true;
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const verificarEstatusParaActivar = async (objetoVerificar = "") => {
  try {
    const estatusBaja = await Estatus.findById("663bd399779a3dfa62327e28");
    const estatusInactivo = await Estatus.findById("66286a4e387f975b640c2368");
    const estatusBuscar = await Estatus.findById(objetoVerificar.uid_estatus);    

    if (estatusBaja._id.toString() !== estatusBuscar._id.toString() && estatusInactivo._id.toString() !== estatusBuscar._id.toString()) {
      throw new Error(`El estatus de ${objetoVerificar.nombre} no es compatible con esta acción`);
    }
    return true;
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

const existeEstatusNombre = async (nombre = "") => {
  try {

    if (nombre) {
      const regex = new RegExp(nombre, "i");

      const existsRol = await Estatus.findOne({ nombre: regex });

      if (existsRol) {
        throw new Error(`El estatus ${nombre} ya existe en la base de datos`);
      }

      return true;
    }
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

const verficiarEstatusNombre = async (nombre = "") => {
  try {

    if (nombre) {
      const regex = new RegExp(nombre, "i");

      const existsRol = await Estatus.findOne({ nombre: regex });

      if (!existsRol) {
        throw new Error(`El estatus ${nombre} no existe en la base de datos`);
      }

      return true;
    }
  } catch (error) {
    throw new Error(
      `Hubo un problema con el servidor, contacta con un administrador. ${error.message}`
    );
  }
};

module.exports = {
  getEstaus,
  obtenerEstatusPausado,
  obtenerEstatusActivo,
  obtenerEstatusBaja,
  obtenerEstatusInactivo,
  obtenerEstatusNombre,
  validaEstatusActivo,
  verificarEstatusActivo,
  verificarEstatusParaActivar,
  existeIDEstatus,
  existeEstatusNombre,
  verficiarEstatusNombre
}