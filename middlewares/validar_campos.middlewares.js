const { response } = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) =>{
    
    // console.log(req);
    const errors = validationResult(req)     
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            body: errors.array()
        })
    }

    next()


}

module.exports = {
    validarCampos
}