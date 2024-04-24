const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    }
})

RoleSchema.methods.toJSON = function () {
    const {__v, _id, ...role} = this.toObject()    
    role.uID = _id
    return role
}

module.exports = model('Role', RoleSchema) // Roles, verifica si la coleccion existe en mongodb y si no la crea