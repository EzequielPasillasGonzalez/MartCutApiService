const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { existeIdTipoEmprendimiento, verificarExisteNombreTipoEmprendimiento } = require('../helpers/index.helpers')
const { createTipoEmprendimiento, getTiposEmprendimiento, getTipoEmprendimientoByNombre, getTipoEmprendimientoByNombreAll, getTipoEmprendimientoByID, getTipoEmprendimientoByIDAll, updateTipoEmprendimientoByID, deleteTipoEmprendimientoByID } = require('../controllers/tipo_emprendimiento.controllers')
const { verficiarEstatusNombre } = require('../helpers/db_validators/estatus.helpers')




const router = Router()

/**
 * {{url}}/api/categorias
 * 
 */

// Obtener todas las categorias - publico
router.get('/', getTiposEmprendimiento)

router.get('/buscarPorNombre/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar la cateogria').notEmpty(),
        validarCampos
    ],
    getTipoEmprendimientoByNombre)

// router.get('/buscarPorNombre/',
//     [
//         check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
//     ],
//     getTipoEmprendimientoByNombre)

router.get('/buscarPorNombreAll/',
    [
        validarJWT,
        esAdminRole,
        check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
    ],
    getTipoEmprendimientoByNombreAll)

router.get('/:id', [
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEmprendimiento),
    validarCampos
], getTipoEmprendimientoByID)

router.get('/buscarPorIdAll/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEmprendimiento),
    validarCampos
], getTipoEmprendimientoByIDAll)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'Es necesario un nombre para poder crear el tipo de emprendimiento').notEmpty(),
    check('nombre').custom(verificarExisteNombreTipoEmprendimiento),
    validarCampos
], createTipoEmprendimiento)


router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEmprendimiento),
    check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
    check('nombre').custom(verificarExisteNombreTipoEmprendimiento),
    validarCampos
], updateTipoEmprendimientoByID)

// Borrar una categoria - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoEmprendimiento),
    check('estatus', 'Es necesario un estatus para poder modificar el tipo de emprendimiento').notEmpty(),
    check('estatus').custom(verficiarEstatusNombre),
    validarCampos
], deleteTipoEmprendimientoByID)

module.exports = router