const {response} = require('express');
const bcryptjs = require('bcryptjs');

const login = async (req, res = response) => {
    res.sendStatus(200).json({
        ok: true,
        body: 'holi'
    })
}

module.exports = {
    login
}