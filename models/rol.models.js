const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El nombre del rol es obligatorio']
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

RoleSchema.methods.toJSON = function () {
    const {__v, _id, ...rol} = this.toObject()    
    rol.uID = _id
    return rol
}

module.exports = model('Role', RoleSchema) // Roles, verifica si la coleccion existe en mongodb y si no la crea