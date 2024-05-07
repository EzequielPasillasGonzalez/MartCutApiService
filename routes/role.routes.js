const { Router } = require('express');
const { check } = require('express-validator')

const { roleGet, rolePost, rolePut, roleDelete, getRolByNombre, getRolByIDAll, getRolByNombreAll } = require('../controllers/roles.controller');

const { validarJWT, esAdminRole, validarCampos } = require('../middlewares/index.middlewares');
const { verficiarEstatusNombre, existeRol, existeIDRole } = require('../helpers/index.helpers');


const router = Router()

router.get('/', roleGet)

router.get('/buscarPorNombre/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar la cateogria').notEmpty(),
    ],
    getRolByNombre)

router.get('/buscarPorNombreAll/',
    [
        check('nombre', 'Es necesario un nombre para poder buscar la cateogria').notEmpty(),
    ],
    getRolByNombreAll)

router.post('/', [
    validarJWT,
    esAdminRole,
    check('nombre').custom(existeRol),
    validarCampos
],
    rolePost)

router.get('/buscarPorIdAll/:id', [
    check('id', 'El ID es necesario para la búsqueda especializada').notEmpty(),
    check('id', 'El ID no es validio').isMongoId(),
    check('id').custom(existeIDRole),
    validarCampos
], getRolByIDAll)

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
    check('estatus', 'Es necesario un estatus para poder modificar el tipo de emprendimiento').notEmpty(),
    check('estatus').custom(verficiarEstatusNombre),
    validarCampos
], roleDelete)

module.exports = router