const Emprendimiento     = require('./emprendimiento.models');
const Estatus = require('./estatus.models')
const Producto     = require('./producto.models');
const Rol         = require('./rol.models')
const TipoEmprendimiento = require('./tipo_emprendimiento.models');
const TipoProucto = require('./tipo_producto.models');
const Usuario = require('./usuario.models')
const CentroUniversitario = require('./centro_universitario.models')
const Server       = require('./server.models')





module.exports = {
    Emprendimiento,
    Producto,
    Rol,
    Server,
    Usuario,
    Estatus,
    TipoEmprendimiento,
    TipoProucto,
    CentroUniversitario    
}

