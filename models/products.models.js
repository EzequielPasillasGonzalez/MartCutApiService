const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    descripcion: {
        type: String,        
    },
    avalible: {
        type: Boolean,
        default: true
    },
    userCreate: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userModify: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createDate: {
        type: Date,
        required: [true, 'La fecha de creación es obligatoria'],
    },
    modifyDate: {
        type: Date,
    },
    img: {
        type: String,
    },
    cantidad: {
        type: Number
    }
})

ProductSchema.methods.toJSON = function () {
    const {__v, _id, ...role} = this.toObject()    
    role.uID = _id
    return role
}

module.exports = model('Product', ProductSchema) // Roles, verifica si la coleccion existe en mongodb y si no la crea