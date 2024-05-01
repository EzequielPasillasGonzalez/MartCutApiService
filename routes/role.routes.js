const { Router } = require('express');
const { check } = require('express-validator')

const { roleGet, rolePost, rolePut, roleDelete } = require('../controllers/roles.controller');

const { validarJWT, esAdminRole, validarCampos } = require('../middlewares/index.middlewares');
const { existeRol, existeIDRole } = require('../helpers/db_validators.helpers');

const router = Router()

router.get('/', roleGet)

router.post('/', [
                validarJWT,
                esAdminRole,                
                check('nombre').custom(existeRol),                
                validarCampos
                ],
                rolePost)

router.put('/:id', [     
                    validarJWT,                    
                    esAdminRole,               
                    check('id', 'Se necesita un ID para actualizar').notEmpty(),
                    check('id', 'No es un ID valido').isMongoId(),
                    check('id').custom(existeIDRole),
                    check('nombre', 'Se necesita el nuevo nombre').notEmpty(),
                    check('nombre').custom(existeRol),                                        
                    validarCampos
                    ], rolePut)     
                    
router.delete('/:id', [
                        validarJWT,                    
                        esAdminRole, 
                        check('id', 'Se necesita un ID para actualizar').notEmpty(),
                        check('id', 'No es un ID valido').isMongoId(),
                        check('id').custom(existeIDRole),
                        validarCampos
                        ], roleDelete)

module.exports = router