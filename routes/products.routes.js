const { Router } = require('express')
const { check } = require('express-validator')

const { validarJWT, validarCampos, esAdminRole, esEmprendedorRolRecursivo } = require('../middlewares/index.middlewares')
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct, updateProductList } = require('../controllers/products.controllers')
const { nombreTipoProductoExisteProduct, existeIDProduct } = require('../helpers/index.helpers')
const { verficiarEstatusNombre } = require('../helpers/db_validators/estatus.helpers')


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
    esEmprendedorRolRecursivo,
    check('nombre', 'Es necesario un nombre para poder crear el producto').notEmpty(),    
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
    check('estatus', 'Es necesario un estatus para poder modificar el tipo de emprendimiento').notEmpty(),
    check('estatus').custom(verficiarEstatusNombre),
    validarCampos
], deleteProduct)

module.exports = router