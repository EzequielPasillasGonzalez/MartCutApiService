const { Router } = require('express')
const { check } = require('express-validator')


// const { validarCampos } = require('../middlewares/validar_campos.middlewares')
// const { validarJWT } = require('../middlewares/validar_jwt.middlewares')
// const { esAdminRole, tieneRole } = require('../middlewares/validar_role.middlewares')
const { validarCampos, validarJWT, esAdminRole  } = require('../middlewares/index.middlewares')

const { estatusGet, estatusPut, estatusPost } = require('../controllers/estatus.controllers')
const { esRoleValido, emailExiste, existeIDEstatus, existeRol, existeEstatusNombre } = require('../helpers/index.helpers')





const router = Router()

router.get('/', estatusGet) //? Se manda a llamar desde los controladores

router.put('/:id', [        //? Para enviar parametros dinamicos
                    validarJWT,
                    esAdminRole,
                    check('id', 'Se necesita un ID para actualizar').notEmpty(),
                    check('id', 'No es un ID valido').isMongoId(),
                    check('id').custom(existeIDEstatus),
                    check('nombre', 'Se necesita el nuevo nombre').notEmpty(),
                    check('nombre').custom(existeEstatusNombre),                                        
                    // check('role').custom(esRoleValido),                    
                    validarCampos // Es para que no truene el programa y lance los errores encontrados
], estatusPut) 

router.post('/', 
            [
                validarJWT,
                esAdminRole,
                check('nombre', 'El nombre del estatus es obligatorio').not().isEmpty(), // No tiene que estar vacio                
                check('nombre').custom(existeEstatusNombre),                                        
                validarCampos
            ], 
            estatusPost
            )

// router.delete('/:id', [
//                 validarJWT,
//                 esAdminRole,                // Obligatoriamente necesita ser administrador para pasar
//                 //tieneRole('User_role', 'Sales_role'), // Puede ser cualquiera de esos dos para pasar
//                 check('id', 'Se necesita un ID para actualizar').notEmpty(),
//                 check('id', 'No es un ID valido').isMongoId(),
//                 check('id').custom(existeID),
//                 validarCampos
// ], usuariosDelete)

// router.patch('/', usuariosPatch)

module.exports = router