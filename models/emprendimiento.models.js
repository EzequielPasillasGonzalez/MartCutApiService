const { Schema, model } = require('mongoose');

const EmprendimientoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],        
    },
    uid_tipo_emprendimiento: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo_emprendimiento'
    },
    uid_producto: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }],
    url_img: {
        type: String,
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

EmprendimientoSchema.methods.toJSON = function () {
    const {__v, _id, ...emprendimiento} = this.toObject()    
    emprendimiento.uID = _id
    return emprendimiento
}

module.exports = model('Emprendimiento', EmprendimientoSchema) // Category, verifica si la coleccion existe en mongodb y si no la crea