const { Router } = require('express');
const { check } = require('express-validator')

const Role = require('../models/role.models');
const { roleGet, rolePost, rolePut, roleDelete } = require('../controllers/roles.controller');
const { nombreRolValido, existeRol, existeIDRole } = require('../helpers/db_validators.helpers');
const { validarCampos } = require('../middlewares/validar_campos.middlewares');

const router = Router()

router.get('/', roleGet)

router.post('/', [
                check('role', 'El nombre del rol es obligatorio').not().isEmpty(),
                check('role').custom(existeRol),
                check('role').custom(nombreRolValido),
                validarCampos
                ],rolePost)

router.put('/:id', [                    
                    check('id', 'Se necesita un ID para actualizar').notEmpty(),
                    check('id', 'No es un ID valido').isMongoId(),
                    check('id').custom(existeIDRole),
                    check('role').custom(nombreRolValido),
                    check('state', 'El state necesita ser un valor valido').isBoolean(),
                    validarCampos
                    ], rolePut)     
                    
router.delete('/:id', [
                        check('id', 'Se necesita un ID para actualizar').notEmpty(),
                        check('id', 'No es un ID valido').isMongoId(),
                        check('id').custom(existeIDRole),
                        validarCampos
                        ], roleDelete)

module.exports = router