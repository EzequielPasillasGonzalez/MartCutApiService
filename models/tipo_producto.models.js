const { Schema, model } = require('mongoose');

const TipoProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],           
    },    
    uid_estatus: {
        type: Schema.Types.ObjectId,
        ref: 'Estatu',
        required: [true, 'El estatus del tipo del producto es obligatorio']
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

TipoProductSchema.methods.toJSON = function () {
    const {__v, _id, ...tipoProducto} = this.toObject()    
    tipoProducto.uid = _id    
    return tipoProducto
}

module.exports = model('tipo_producto', TipoProductSchema) // Roles, verifica si la coleccion existe en mongodb y si no la crea