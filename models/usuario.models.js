const {Schema, model, default: mongoose} = require('mongoose')

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']        
    },
    apellido_paterno: {
        type: String,
        required: [true, 'El apellido paterno es obligatorio']
    },
    apellido_materno: {
        type: String,        
    },
    celular: {
        type: String,
        required: [true, 'El numero de telefono es obligatorio'],
        unique: true
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']        
    },
    calificacion: {
        type: mongoose.Types.Decimal128, //? Para aceptar decimales        
    },
    url_img: {
        type: String,        
    },
    uid_rol: {
        type: Schema.Types.ObjectId,
        ref: 'Role', 
        required: [true, 'El rol del usuario es obligatorio']        
    },
    uid_estatus: {
        type: Schema.Types.ObjectId,
        ref: 'Estatu',
        required: [true, 'El estatus del usuario es obligatorio']                
    },
    google: {
        type: Boolean,
        default: false
    },
    uid_emprendimiento: {
        type: Schema.Types.ObjectId,
        ref: 'Emprendimiento'  
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

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user} = this.toObject() // se saca la version y el password y el resto se guarda en ...usuario para poder mostrarlo o cualquier otra cosa         
    user.uID = _id
    return user
}


module.exports = model('Usuario', UsuarioSchema)