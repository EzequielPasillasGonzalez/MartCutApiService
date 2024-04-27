const { response } = require('express')

const manejoErores = async (req, res = response, next) => {

    console.error('Error:', error.message);

    res.status(500).json({
        ok: false,
        body: `Huboe un error ${error.message}`
    })
}

module.exports = {
    manejoErores
}