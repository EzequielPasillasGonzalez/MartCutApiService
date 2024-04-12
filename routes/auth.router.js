const { Router } = require('express')
const { check } = require('express-validator')

const { login } = require('../controllers/auth.controller')
//const { login, googleSigIn, renovarToken } = require('../controllers/auth.controller')
//const { validarCampos, validarJWT } = require('../middlewares/index.middlewares')


const router = Router()

// router.post('/login', [
//                 check('correo', 'El correo es obligatorio').isEmail(),
//                 check('password', 'La contraseña es obligatoria').not().isEmpty(),
//                 validarCampos,
// ], login) //? Se manda a llamar desde los controladores

// router.post('/google', [
//     check('id_token', 'El id_token es obligatorio').not().isEmpty(),    
//     validarCampos,
// ], googleSigIn) 

// router.get('/', [
//     validarJWT
// ], renovarToken)

router.get('/', [

], login)

module.exports = router