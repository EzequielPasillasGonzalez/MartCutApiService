const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { getTipoEntregas, getTipoEntregaByNombre, getTipoEntregaByNombreAll, getTipoEntregaByIDAll, getTipoEntregaByID, createTipoEntrega, updateTipoEntregaByID, deleteTipoEntregaByID } = require('../controllers/tipo_entrega.controller')
const { verficiarEstatusNombre, existeIdTipoEntrega, nombreTipoEntregaExiste } = require('../helpers/index.helpers')





const router = Router()

/**
 * {{url}}/api/categorias
 * 
 */

// Obtener todas las categorias - publico
router.get('/', getTipoEntregas)

router.get('/buscarPorNombre/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar el tipo de entrega').notEmpty(),
        validarCampos
    ],
    getTipoEntregaByNombre)

router.get('/buscarPorNombreAll/',
    [
        validarJWT,
        esAdminRole,
        check('nombre', 'Es necesario un nombre para poder buscar el tipo de entrega').notEmpty(),
    ],
    getTipoEntregaByNombreAll)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEntrega),
    validarCampos
], getTipoEntregaByID)

router.get('/buscarPorIdAll/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEntrega),
    validarCampos
], getTipoEntregaByIDAll)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'Es necesario un nombre para poder crear el tipo de entrega').notEmpty(),
    check('nombre').custom(nombreTipoEntregaExiste),
    validarCampos
], createTipoEntrega)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEntrega),
    check('nombre', 'Es necesario un nombre para poder buscar el tipo el tipo de entrega').notEmpty(),
    check('nombre').custom(nombreTipoEntregaExiste),
    validarCampos
], updateTipoEntregaByID)

// Borrar una categoria - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEntrega),
    check('estatus', 'Es necesario un estatus para poder modificar el tipo de entrega').notEmpty(),
    check('estatus').custom(verficiarEstatusNombre),
    validarCampos
], deleteTipoEntregaByID)

module.exports = router