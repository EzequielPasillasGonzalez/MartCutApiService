const {Schema, model} = require('mongoose')

const TipoentregaSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre del dela entrega es obligatorio']        
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

TipoentregaSchema.methods.toJSON = function() {
    const { __v, _id, ...entrega} = this.toObject() // se saca la version y el password y el resto se guarda en ...usuario para poder mostrarlo o cualquier otra cosa         
    entrega.uid = _id
    return entrega
}


module.exports = model('Tipo_entrega', TipoentregaSchema)