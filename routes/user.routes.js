const { Router } = require('express')
const { check } = require('express-validator')


const { validarCampos, validarJWT, esAdminRole, esUsuarioRolRecursivo } = require('../middlewares/index.middlewares')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch, usuariosAltaEmprendedor, usuariosBaja, usuariosGetId, usuariosGetCorreo, usuariosPutIDCambiarPassword, usuariosGetNombre } = require('../controllers/user.controllers')
const { verficiarEstatusNombre, emailExiste, existeIdUsuario, celularExiste } = require('../helpers/index.helpers')




const router = Router()

router.get('/', usuariosGet) //? Se manda a llamar desde los controladores

router.get('/buscarNombre', [        //? Para enviar parametros dinamicos    
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
    validarCampos, // Es para que no truene el programa y lance los errores encontrados    
], usuariosGetNombre)

router.get('/buscarCorreo', [        //? Para enviar parametros dinamicos    
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),    
    validarCampos, // Es para que no truene el programa y lance los errores encontrados    
], usuariosGetCorreo)


router.get('/:id', [        //? Para enviar parametros dinamicos    
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),  
    validarCampos, // Es para que no truene el programa y lance los errores encontrados    
], usuariosGetId)



router.put('/:id', [        //? Para enviar parametros dinamicos
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    esUsuarioRolRecursivo,      
    validarCampos, // Es para que no truene el programa y lance los errores encontrados    
], usuariosPut)

router.put('/recuperarPassword/:id', [        //? Para enviar parametros dinamicos
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),    
    validarCampos, // Es para que no truene el programa y lance los errores encontrados    
], usuariosPutIDCambiarPassword)

router.put('/emprendedor/:id', [        //? Para enviar parametros dinamicos
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    esUsuarioRolRecursivo,      
    validarCampos, // Es para que no truene el programa y lance los errores encontrados    
], usuariosAltaEmprendedor)


router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), // No tiene que estar vacio
        check('apellido_paterno', 'El apellido paterno es obligatorio').not().isEmpty(), // No tiene que estar vacio                
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña es obligatoria y debe de contener almenos de 8 carácteres').isLength({ min: 8 }),
        check('correo', 'El correo es obligatorio').not().isEmpty(),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('celular', 'El celular es obligatorio').not().isEmpty(),
        check('celular', 'El celular es obligatorio').isLength({ min: 10 }),
        check('celular').custom(celularExiste),
        validarCampos
    ],
    usuariosPost
)

router.delete('/:id', [
    validarJWT,
    esAdminRole,                // Obligatoriamente necesita ser administrador para pasar
    //tieneRole('User_role', 'Sales_role'), // Puede ser cualquiera de esos dos para pasar
    check('id', 'Se necesita un ID para actualizar').notEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    check('estatus', 'Es necesario un estatus para poder modificar el tipo de emprendimiento').notEmpty(),
    check('estatus').custom(verficiarEstatusNombre),
    validarCampos
], usuariosDelete)

router.delete('/baja/:id', [
    validarJWT,
    esUsuarioRolRecursivo,                // Obligatoriamente necesita ser administrador para pasar
    //tieneRole('User_role', 'Sales_role'), // Puede ser cualquiera de esos dos para pasar
    check('id', 'Se necesita un ID para actualizar').notEmpty(),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),

    validarCampos
], usuariosBaja)

// router.patch('/', usuariosPatch)

module.exports = router