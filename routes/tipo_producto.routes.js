const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { createCategory, getCategories, getCategoryByID, updateCategoryByID, deleteCategoryByID, getCategoryByNombre, getCategoryByNombreAll, getCategoryByIDAll } = require('../controllers/tipo_producto.controller')
const { existeIdTipoProducto, nombreTipoProductoExiste, } = require('../helpers/index.helpers')


const router = Router()

/**
 * {{url}}/api/categorias
 * 
 */

// Obtener todas las categorias - publico
router.get('/', getCategories)

router.get('/buscarPorNombre/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar la cateogria').notEmpty(),
    ],
    getCategoryByNombre)

router.get('/buscarPorNombreAll/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar la cateogria').notEmpty(),
    ],
    getCategoryByNombreAll)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoProducto),
    validarCampos
], getCategoryByID)

router.get('/buscarPorIdAll/:id', [
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoProducto),
    validarCampos
], getCategoryByIDAll)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'Es necesario un nombre para poder crear la cateogria').notEmpty(),
    check('nombre').custom(nombreTipoProductoExiste),
    validarCampos
], createCategory)

router.put('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoProducto),
    check('nombre').custom(nombreTipoProductoExiste),
    validarCampos
], updateCategoryByID)

// Borrar una categoria - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoProducto),
    validarCampos
], deleteCategoryByID)

module.exports = router