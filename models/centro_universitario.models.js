const { Schema, model } = require('mongoose');

const CentrosUniversitariosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del Centro Universitario es obligatorio'],
        unique: true
    },
    abreviado: {
        type: String,
        required: [true, 'La abreviatura del Centro Universitario es obligatorio'],
        unique: true
    },
    domicilio: {
        type: String,
        required: [true, 'El domicilio del Centro Universitario es obligatorio'],
        unique: true
    },
    uid_estatus: {
        type: Schema.Types.ObjectId,
        ref: 'Estatu'
    },
    fecha_creacion: {
        type: Date,
        required: [true, 'La fecha de creacion es obligatorio']
    },
    fecha_modificacion: {
        type: Date,
    },
    uid_modificado_por: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
})

CentrosUniversitariosSchema.methods.toJSON = function () {
    const {__v, _id, ...centro_universitario} = this.toObject()    
    centro_universitario.uid = _id
    return centro_universitario
}

module.exports = model('Centro_universitario', CentrosUniversitariosSchema) // Roles, verifica si la coleccion existe en mongodb y si no la crea