const Emprendimiento      = require('./emprendimiento.models');
const Estatus             = require('./estatus.models')
const Producto            = require('./producto.models');
const Role                = require('./rol.models')
const TipoEmprendimiento  = require('./tipo_emprendimiento.models');
const TipoProucto         = require('./tipo_producto.models');
const Usuario             = require('./usuario.models')
const CentroUniversitario = require('./centro_universitario.models')
const Server              = require('./server.models')
const Transporter     = require('../models/mailer.models');





module.exports = {
    Emprendimiento,
    Producto,
    Role,
    Server,
    Usuario,
    Estatus,
    TipoEmprendimiento,
    TipoProucto,
    CentroUniversitario,
    Transporter    
}

