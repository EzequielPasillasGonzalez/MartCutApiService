const {Schema, model} = require('mongoose')

const EstatusSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre del estatus es obligatorio']        
    },
    fecha_creacion: {
        type: Date,        
        required: [true, 'La fecha de creacion es obligatorio']     
    },
    fecha_modificacion: {
        type: Date,        
    },
    modificado_por: {
        type: Schema.Types.ObjectId,
        ref: 'User'        
    },
    

})

EstatusSchema.methods.toJSON = function() {
    const { __v, _id, ...estatus} = this.toObject() // se saca la version y el password y el resto se guarda en ...usuario para poder mostrarlo o cualquier otra cosa         
    estatus.uID = _id
    return estatus
}


module.exports = model('Estatu', EstatusSchema)