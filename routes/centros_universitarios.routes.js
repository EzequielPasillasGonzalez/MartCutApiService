const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { verficiarEstatusNombre, existeEstatusNombre, existeIdTipoEmprendimiento, verificarExisteNombreTipoEmprendimiento } = require('../helpers/index.helpers')
const { createCentroUniversitario, getCentrosUniversitarios } = require('../controllers/centros_universitarios.controllers')




const router = Router()

/**
 * {{url}}/api/categorias
 * 
 */

// Obtener todas las categorias - publico
router.get('/', getCentrosUniversitarios)

router.get('/buscarPorNombre/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar el Centro Universitario').notEmpty(),
        validarCampos
    ],
    getTipoEmprendimientoByNombre)

// router.get('/buscarPorNombre/',
//     [
//         check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
//     ],
//     getTipoEmprendimientoByNombre)

// router.get('/buscarPorNombreAll/',
//     [
//         validarJWT,
//         esAdminRole,
//         check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
//     ],
//     getTipoEmprendimientoByNombreAll)

// router.get('/:id', [
//     check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
//     check('id', 'El ID no es validio').isMongoId(),
//     check('id').custom(existeIdTipoEmprendimiento),
//     validarCampos
// ], getTipoEmprendimientoByID)

// router.get('/buscarPorIdAll/:id', [
//     validarJWT,
//     esAdminRole,
//     check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
//     check('id', 'El ID no es validio').isMongoId(),
//     check('id').custom(existeIdTipoEmprendimiento),
//     validarCampos
// ], getTipoEmprendimientoByIDAll)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'Es necesario un nombre para poder crear el crear el Centro Universitario').notEmpty(),
    check('nombre').custom(verificarExisteNombreTipoEmprendimiento),
    check('abreviacion', 'Es necesario una abreviacion para poder crear el Centro Universitario').notEmpty(),
    check('domicilio', 'Es necesario una domicilio para poder crear el Centro Universitario').notEmpty(),
    validarCampos
], createCentroUniversitario)


// router.put('/:id', [
//     validarJWT,
//     esAdminRole,
//     check('id', 'El ID es necesario para la modificacion').notEmpty(),
//     check('id', 'El ID no es validio').isMongoId(),
//     check('id').custom(existeIdTipoEmprendimiento),
//     check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
//     check('nombre').custom(verificarExisteNombreTipoEmprendimiento),
//     validarCampos
// ], updateTipoEmprendimientoByID)

// // Borrar una categoria - Admin - cualquier persona con un token valido
// router.delete('/:id', [
//     validarJWT,
//     esAdminRole,
//     check('id', 'El ID es necesario para la modificacion').notEmpty(),
//     check('id', 'El ID no es validio').isMongoId(),
//     check('id').custom(existeIdTipoEmprendimiento),
//     check('estatus', 'Es necesario un estatus para poder modificar el tipo de emprendimiento').notEmpty(),
//     check('estatus').custom(verficiarEstatusNombre),
//     validarCampos
// ], deleteTipoEmprendimientoByID)

module.exports = router