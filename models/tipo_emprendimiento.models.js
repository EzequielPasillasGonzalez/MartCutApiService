const { Schema, model } = require('mongoose');

const TipoEmprendimientoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],        
    },
    uid_estatus: {
        type: Schema.Types.ObjectId,
        ref: 'Estatu',
        required: [true, 'El estatus del emprendimiento es obligatorio']
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

TipoEmprendimientoSchema.methods.toJSON = function () {
    const {__v, _id, ...tipoEmprendimiento} = this.toObject()    
    tipoEmprendimiento.uID = _id
    return tipoEmprendimiento
}

module.exports = model('Tipo_emprendimiento', TipoEmprendimientoSchema) // Category, verifica si la coleccion existe en mongodb y si no la crea