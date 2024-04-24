const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { createCategory, getCategories, getCategoryByID, updateCategoryByID, deleteCategoryByID } = require('../controllers/category.controller')
const { existeIDCategory, nombreCategoryExiste,  } = require('../helpers/db_validators.helpers')


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
    check('id').custom(existeIDCategory),
    validarCampos
], getCategoryByID)


// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'Es necesario un nombre para poder crear la cateogria').notEmpty(),
    check('nombre').custom(nombreCategoryExiste),
    validarCampos
],  createCategory)

// Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIDCategory),    
    check('nombre').custom(nombreCategoryExiste),
    validarCampos
],updateCategoryByID)

// Borrar una categoria - Admin - cualquier persona con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID es necesario para la modificacion').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIDCategory),
    validarCampos
], deleteCategoryByID)

module.exports = router