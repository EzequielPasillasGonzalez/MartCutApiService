const { response } = require('express')

const { Role, Estatus } = require('../models/index.models')

const roleGet = async (req, res = response) =>{

    try {
        
    const state = {state : true}

    let {limit, from} = req.query

    // Verificar y asignar valores predeterminados si son cadenas vacías o no están definidos
    limit = limit === '' || limit === undefined ? 5 : Number(limit);
    from = from === '' || from === undefined ? 0 : Number(from);

    const [total, role] = await Promise.all([
        Role.countDocuments(state),
        Role.find(state)
                        .skip(Number(from))
                        .limit(Number(limit))
    ])
    

    res.json({
        ok: true,
        body: role
    })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

const rolePost = async (req, res = response) =>{

    try {
        const { rol } = req.body

        const uid_estatus = await Estatus.findOne({ _id: '662857091815a1aa5532119a' })   
        
        const fecha_creacion = new Date()         

        const roleNuevo = new Role({ rol, uid_estatus, fecha_creacion })
        
        

        await roleNuevo.save()

        res.json({
            ok: true,
            body: roleNuevo       
        })    
    } catch(error) {
        res.json({
            ok: true,
            body: `Ocurrio un problema con el servidor, contacta con el administrador. ${error.message}`       
        })    
    }
    
    
}

const rolePut = async (req, res = response) => {
    
    const { id } = req.params
    

    const {_id, ...rol} = req.body    

    // Validar en la base de datos    
    const role = await Role.findByIdAndUpdate(id, rol)    

    res.json({
        ok: true,
        body: role
    })
}

const roleDelete = async (req, res = response) => {
    const { id } = req.params
    
    // Desactivar
    const role = await Role.findByIdAndUpdate(id, {state: false},)

    res.json({
        ok: true,
        body: role
    })
}

module.exports = {
    roleGet,
    rolePost,
    rolePut,
    roleDelete
}