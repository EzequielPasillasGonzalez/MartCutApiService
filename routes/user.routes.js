const { Router } = require('express')
const { check } = require('express-validator')


const { validarCampos, validarJWT, esAdminRole, esEmprendedorRol } = require('../middlewares/index.middlewares')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user.controllers')
const { esRoleValido, emailExiste, existeIdUsuario } = require('../helpers/index.helpers')
const { manejoErores } = require('../middlewares/manejo_erores.middlewares')



const router = Router()

router.get('/', usuariosGet) //? Se manda a llamar desde los controladores

router.put('/:id', [        //? Para enviar parametros dinamicos
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeIdUsuario),
    esEmprendedorRol,      
    validarCampos, // Es para que no truene el programa y lance los errores encontrados
    // manejoErores
], usuariosPut)


router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(), // No tiene que estar vacio
        check('apellido_paterno', 'El apellido paterno es obligatorio').not().isEmpty(), // No tiene que estar vacio                
        check('password', 'El password es obligatorio y debe de contener más de 8 carácteres').isLength({ min: 8 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
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
    validarCampos
], usuariosDelete)

router.patch('/', usuariosPatch)

module.exports = router