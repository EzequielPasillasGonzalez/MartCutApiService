const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],           
    },
    uid_tipo_producto: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo_producto',
        required: [true, 'El tipo del producto es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del producto es obligatorio'],
    },
    cantidad: {
        type: Number,        
    },
    url_img: {
        type: String,
    }, 
    precio: {
        type: Number,
    },
    uid_estatus: {
        type: Schema.Types.ObjectId,
        ref: 'Estatu',
        required: [true, 'El estatus del producto es obligatorio']
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

ProductoSchema.methods.toJSON = function () {
    const {__v, _id, ...produto} = this.toObject()    
    produto.uid = _id
    return produto
}

module.exports = model('Producto', ProductoSchema) // Roles, verifica si la coleccion existe en mongodb y si no la crea