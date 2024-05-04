const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
    Producto,
} = require("../../models/index.models");

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

module.exports = {
    existeIDProduct
}