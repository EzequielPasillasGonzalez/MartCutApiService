const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/index.middlewares')
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, updateProductList } = require('../controllers/products.controllers')
const { nombreTipoProductoExisteProduct, existeIDProduct } = require('../helpers/db_validators.helpers')


const router = Router()

/**
 * {{url}}/api/products
 * 
 */

// Obtener todas las products - publico
router.get('/', getProducts)

// Obtener una products por id - publico
router.get('/:id', [
    check('id', 'Debe de contener un ID para hacer la busqueda especializada').notEmpty(),
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(existeIDProduct),    
    validarCampos
], getProductById)


// Crear una products - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'Es necesario un nombre para poder crear el producto').notEmpty(),
    // check('nombre').custom(nombreProductExiste),
    check('category', 'La categoria es necesaria para la creación de los productos').notEmpty(),
    check('category').custom(nombreTipoProductoExisteProduct),
    validarCampos
], createProduct)

// Actualizar una products - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id', 'Debe de contener un ID para hacer la modifcacion').notEmpty(),
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(existeIDProduct),
    validarCampos
], updateProduct)

router.patch('/list/', [
    validarJWT,
    // check('id', 'Debe de contener un ID para hacer la modifcacion').notEmpty(),
    // check('id', 'El ID no es valido').isMongoId(),
    // check('id').custom(existeIDProduct),
    //validarCampos
], updateProductList)

// Borrar un products - Admin - cualquier persona con un token valido
router.delete('/:id', [
    //validarJWT,
    //esAdminRole,
    check('id', 'Debe de contener un ID para eliminar el producto').notEmpty(),
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(existeIDProduct),
    validarCampos
], deleteProduct)

module.exports = router