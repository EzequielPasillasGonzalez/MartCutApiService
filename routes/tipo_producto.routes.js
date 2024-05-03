const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { createCategory, getCategories, getCategoryByID, updateCategoryByID, deleteCategoryByID } = require('../controllers/tipo_producto.controller')
const { existeIdTipoProducto, nombreTipoProductoExiste,  } = require('../helpers/db_validators.helpers')


const router = Router()

/**
 * {{url}}/api/categorias
 * 
 */

// Obtener todas las categorias - publico
router.get('/', getCategories)

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoProducto),
    validarCampos
], getCategoryByID)


// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre', 'Es necesario un nombre para poder crear la cateogria').notEmpty(),
    check('nombre').custom(nombreTipoProductoExiste),
    validarCampos
],  createCategory)

// Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIdTipoProducto),    
    check('nombre').custom(nombreTipoProductoExiste),
    validarCampos
],updateCategoryByID)

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