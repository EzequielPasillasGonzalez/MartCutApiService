const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { existeIdCentroUniversitario, verficiarEstatusNombre} = require('../helpers/index.helpers')
const { createCentroUniversitario, getCentrosUniversitarios, getCentroUniversitarioByNombre, getCentroUniversitarioByNombreAll, getCentroUniversitarioByID, getCentroUniversitarioByIDAll, updateCentroUniversitarioByID, deleteCentroUniversitarioByID } = require('../controllers/centros_universitarios.controllers')
const { verificarExisteNombreCentroUniversitario } = require('../helpers/db_validators/centroUniversitario.helpers')




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
    getCentroUniversitarioByNombre
)

router.get('/buscarPorNombreAll/',
    [
        validarJWT,
        esAdminRole,
        check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
    ],
    getCentroUniversitarioByNombreAll)

router.get('/:id', [
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    existeIdCentroUniversitario,
    validarCampos
], getCentroUniversitarioByID)

router.get('/buscarPorIdAll/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),    
    validarCampos
], getCentroUniversitarioByIDAll)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'Es necesario un nombre para poder crear el crear el Centro Universitario').notEmpty(),
    check('nombre').custom(verificarExisteNombreCentroUniversitario),
    check('abreviacion', 'Es necesario una abreviacion para poder crear el Centro Universitario').notEmpty(),
    check('domicilio', 'Es necesario una domicilio para poder crear el Centro Universitario').notEmpty(),
    validarCampos
], createCentroUniversitario)


router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    existeIdCentroUniversitario,
    check('nombre').custom(verificarExisteNombreCentroUniversitario),
    validarCampos
], updateCentroUniversitarioByID)

// Borrar una categoria - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    existeIdCentroUniversitario,
    check('estatus', 'Es necesario un estatus para poder modificar el tipo de emprendimiento').notEmpty(),
    check('estatus').custom(verficiarEstatusNombre),
    validarCampos
], deleteCentroUniversitarioByID)

module.exports = router