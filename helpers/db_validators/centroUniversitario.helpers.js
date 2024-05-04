const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const {
    CentroUniversitario,
} = require("../../models/index.models");

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

module.exports = {
    buscarAbreviaturaCentroUniversitario,
    buscarIdCentroUniversitario,
    buscarNombreCentroUniversitario,
    verificarExisteNombreCentroUniversitario,
}
