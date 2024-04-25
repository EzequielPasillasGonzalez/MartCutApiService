const { Category, Producto, Role } = require('../models/index.models')

// const Usuario = require('../models/usuario.models')
const { Estatus, Usuario } = require('../models/index.models')


const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role})
    if(!existeRol){
        throw new Error(`El rol ${role} no existe en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {    

    const regex = new RegExp( correo, 'i') 

    const existsEmail = await Usuario.findOne({correo: regex})

    if(existsEmail) {        
        throw new Error(`El correo ${correo} ya existe en la base de datos`)
    }
}

const existeID = async (id = '') => {
    const existeUsuario = await Usuario.findById(id)

    if(!existeUsuario) {        
        console.log('error');
        throw new Error(`El id ${id} no existe en la base de datos`)
    }
    
    // if(existeUsuario.state === false){
    //     throw new Error(`El usuario ${existeUsuario.nombre} esta dado de baja en la base de datos`)
    // }

    return true
}

const existeIDEstatus = async (id = '') => {
    const existeEstatus = await Estatus.findById(id)

    if (!existeEstatus) {
        console.log('error');
        throw new Error(`El id ${id} no existe en la base de datos`)
    }

    // if (existeEstatus.state === false) {
    //     throw new Error(`El usuario ${existeUsuario.nombre} esta dado de baja en la base de datos`)
    // }

    return true
}

const nombreRolValido = async (role = '') => {
    const nombreValido = role.endsWith('_role')    

    if(!nombreValido){
        throw new Error('El nombre debe de contener _role al final para que sea valido')
    }
}

const existeRol = async (role = '') =>{
    const regex = new RegExp( role, 'i') 
    
    const existsRol = await Role.findOne({role: regex})    

    if(existsRol){
        throw new Error(`El rol ${role} ya existe en la base de datos`)
    }
}

const existeIDRole = async (id = '') => {
    const existeRole = await Role.findById(id)

    if(!existeRole) {        
        console.log('error');
        throw new Error(`El id ${id} no existe en la base de datos`)
    }
}

const existeIDCategory = async ( id='') =>{
    const existeCategory = await Category.findById(id)

    if(!existeCategory) {
        console.log('Error');
        throw new Error(`el id ${id} no existe en la base de datos`)
    }
}


const nombreCategoryExiste = async (nombre = '') => {    

    const regex = new RegExp( nombre, 'i') 

    const existsnombre = await Category.findOne({nombre: regex})

    if(existsnombre) {        
        throw new Error(`La categoria ${nombre} ya existe en la base de datos`)
    }
}

const nombreProductExiste = async (nombre = '') => {    
    
    const regex = new RegExp( nombre, 'i') 

    const existsnombre = await Producto.findOne({nombre: regex})

    if(existsnombre) {        
        throw new Error(`El producto ${nombre} ya existe en la base de datos`)
    }
}

const nombreCategoryExisteProduct = async (nombre = '') => {    
    const existsnombre = await Category.findOne({nombre})

    if(!existsnombre) {        
        throw new Error(`La categoria ${nombre} no existe en la base de datos`)
    }
}

const existeIDProduct = async ( id='') =>{
    const existeCategory = await Producto.findById(id)    

    if(!existeCategory) {
        console.log('Error');
        throw new Error(`El id ${id} no existe en la base de datos`)
    }
}

const buscarCorreoUserModify = async (correo = '') => {
    const existsEmail = await Usuario.findOne({correo})

        if(!existsEmail) {        
            throw new Error(`El correo ${correo} no existe en la base de datos`)
        }

        return existsEmail
}

const buscarCategoriaModificarProducto = async (category = '') => {
    const categoria = await Category.findOne({nombre:category})

        if(!categoria){
            throw new Error(`La categoria ${category} no existe en la base de datos`)
        }
        

    if(categoria.state === false){
        throw new Error(`La categoria ${categoria.nombre} esta dada de baja en la base de datos`)
    }

    return categoria
}


const buscarCategoria = async (category = '') => {
    const categoria = await Category.find({nombre:category})

        if(!categoria){
            throw new Error(`La categoria ${category} no existe en la base de datos`)
        }
        

    if(categoria.state === false){
        throw new Error(`La categoria ${categoria.nombre} esta dada de baja en la base de datos`)
    }            
    return categoria
}

const coleccionesPermitidas = async ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes(coleccion)

    if( !incluida ){
        throw new Error(`La coleccion ${coleccion} no es permitida, las permitidas son ${colecciones}`)
    }

    return true
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeID,
    nombreRolValido,
    existeRol,
    existeIDRole,
    existeIDCategory,
    nombreCategoryExiste,
    nombreProductExiste,
    nombreCategoryExisteProduct,
    existeIDProduct,
    buscarCorreoUserModify,
    buscarCategoriaModificarProducto,
    buscarCategoria,
    coleccionesPermitidas,
    existeIDEstatus
}