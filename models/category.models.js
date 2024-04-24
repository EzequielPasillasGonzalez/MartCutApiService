const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
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
        required: [true, 'La fecah de creación es obligatoria'],
    },
    modifyDate: {
        type: Date,
    }
})

CategorySchema.methods.toJSON = function () {
    const {__v, _id, ...category} = this.toObject()    
    category.uID = _id
    return category
}

module.exports = model('Categorie', CategorySchema) // Category, verifica si la coleccion existe en mongodb y si no la crea