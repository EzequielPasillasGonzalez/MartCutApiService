const generarJWT = require("./generarJWT.helpers");
const dbValidators = require("./db_validators.helpers");
const google_verify = require("./google_verify.helpers");
const subir_archivo = require("./subir_archivo.helpers");
const sendEmail = require("../controllers/email.controller");
const usuarioDBHelper = require('./db_validators/usuario.helpers')
const estatusDBHelper = require('./db_validators/estatus.helpers')
const centroUniversitarioDBHelper = require('./db_validators/centroUniversitario.helpers')
const productoDBHelper = require('./db_validators/producto.helpers')
const rolDBHelper = require('./db_validators/role.helpers')
const tipoEmprendimientoDBHelper = require('./db_validators/tipoEmprendimiento.helpers')
const tipoProductoDBHelper = require('./db_validators/tipoProducto.helpers')

module.exports = { // Se exportan todos sus modulos
    ...centroUniversitarioDBHelper,
    ...dbValidators,
    ...estatusDBHelper,
    ...generarJWT,
    ...google_verify,
    ...productoDBHelper,
    ...rolDBHelper,
    ...sendEmail,
    ...subir_archivo,
    ...tipoEmprendimientoDBHelper,
    ...tipoProductoDBHelper,
    ...usuarioDBHelper,
}