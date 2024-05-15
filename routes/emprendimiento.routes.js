const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esEmprendedorRolRecursivo, esAdminRole } = require('../middlewares/index.middlewares')
const { verficiarEstatusNombre, existeIdEmprendimiento} = require('../helpers/index.helpers')
const { createEmprendimiento, emprendimientosGet, updateEmprendimientoByID, getEmprendimientoById, getEmprendimientoByIdAll, getEmprendimientoByNombre, getEmprendimientoByNombreAll, deleteEmprendimientoByID } = require('../controllers/emprendimiento.controller')



const router = Router()

/**
 * {{url}}/api/products
 * 
 */

// Obtener todas las products - publico
router.get('/', emprendimientosGet)

router.get('/buscarPorNombre/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar la cateogria').notEmpty(),
        validarCampos
    ],
    getEmprendimientoByNombre)

router.get('/buscarPorNombreAll/',
    [
        validarJWT,
        esAdminRole,
        check('nombre', 'Es necesario un nombre para poder buscar el tipo de emprendimiento').notEmpty(),
    ],
    getEmprendimientoByNombreAll)


// Obtener una products por id - publico
router.get('/:id', [
    check('id', 'Debe de contener un ID para hacer la busqueda especializada').notEmpty(),
    check('id', 'El ID no es valido').isMongoId(),
    existeIdEmprendimiento,
    validarCampos
], getEmprendimientoById)

router.get('/buscarPorIdAll/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    existeIdEmprendimiento,
    validarCampos
], getEmprendimientoByIdAll)


// Crear una products - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    esEmprendedorRolRecursivo,
    check('nombre', 'Es necesario un nombre para poder crear el crear el producto').notEmpty(),
    validarCampos
], createEmprendimiento)

// Actualizar una products - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'Debe de contener un ID para hacer la modifcacion').notEmpty(),
    check('id', 'El ID no es valido').isMongoId(),
    existeIdEmprendimiento,
    esEmprendedorRolRecursivo,
    validarCampos
], updateEmprendimientoByID)


// Borrar un products - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'Debe de contener un ID para eliminar el producto').notEmpty(),
    check('id', 'El ID no es valido').isMongoId(),
    existeIdEmprendimiento,
    check('estatus', 'Es necesario un estatus para poder modificar el tipo de emprendimiento').notEmpty(),
    check('estatus').custom(verficiarEstatusNombre),
    validarCampos
], deleteEmprendimientoByID)

module.exports = router