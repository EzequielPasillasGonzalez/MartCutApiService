const { Router } = require('express')

const { buscar } = require('../controllers/search.controller')
const { validarCampos } = require('../middlewares/validar_campos.middlewares')

const router = Router()

router.get('/:coleccion/:termino',buscar)


module.exports = router