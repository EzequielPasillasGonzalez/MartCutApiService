const { response } = require("express");
const path = require('path')
const fs = require('fs');
const cloudinary = require('cloudinary').v2

cloudinary.config( process.env.CLOUDINARY_URL )

const { subirArchivo, existeID } = require("../helpers/index.helpers");
const { Usuario, Producto } = require("../models/index.models");

const cargarArchivos = async (req, res = response) => {
    

    try {
        
        // Imagenes, txt, md
        //const pathArchivo = await subirArchivo(req.files, ['txt', 'md'], 'textos' )
        const pathArchivo = await subirArchivo(req.files, undefined, 'imgs' )

        res.json({
            ok: true,
            body: {pathArchivo}
        })

    } catch(error) {
        
        res.status(400).json({
            ok: false,
            body: error
        })

    }

}

const actualizarImagenUser = async (req, res = response) => {

    try {
        
        const { id, coleccion} = req.params
        
        let modelo

        switch (coleccion) {
            case 'usuarios':
                    modelo = await Usuario.findById(id)

                    if(!modelo){
                        return res.status(400).json({
                            ok: false,
                            body: `No existe un usuario con el id ${id}`
                        })
                    }

                    if(modelo.state === false){
                        return res.status(400).json({
                            ok: false,
                            body: `El usuario ${modelo.nombre} esta dado de baja en la base de datos`
                        })
                    }

                    

                break;

            case 'productos':
                    
                    modelo = await Producto.findById(id)

                    if(!modelo){
                        return res.status(400).json({
                            ok: false,
                            body: `No existe un producto con el id ${id}`
                        })
                    }

                    if(modelo.state === false){
                        return res.status(400).json({
                            ok: false,
                            body: `El usuario ${modelo.nombre} esta dado de baja en la base de datos`
                        })
                    }

                break;

            default:
                    return res.status(500).json({
                        ok: false,
                        body: 'Aun no programo esto'
                    })           
        }

        //Limpiar imagenes previas
        if(modelo.img){

            // Borrar la imagen del servidor
            const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img )

            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen)
            }
        }
        
        

        const pathArchivo = await subirArchivo(req.files, undefined, coleccion )

        modelo.img = pathArchivo

        await modelo.save()

        res.json({
            ok: true,
            body: {
                id,
                modelo
            }
        })

    } catch(error) {
        
        res.status(400).json({
            ok: false,
            body: error
        })


    }

}

const actualizarImagenCloudinary = async (req, res = response) => {

    try {
        
        const { id, coleccion} = req.params
        
        let modelo

        switch (coleccion) {
            case 'usuarios':
                    modelo = await Usuario.findById(id)

                    if(!modelo){
                        return res.status(400).json({
                            ok: false,
                            body: `No existe un usuario con el id ${id}`
                        })
                    }

                    if(modelo.state === false){
                        return res.status(400).json({
                            ok: false,
                            body: `El usuario ${modelo.nombre} esta dado de baja en la base de datos`
                        })
                    }

                    

                break;

            case 'productos':
                    
                    modelo = await Producto.findById(id)

                    if(!modelo){
                        return res.status(400).json({
                            ok: false,
                            body: `No existe un producto con el id ${id}`
                        })
                    }

                    if(modelo.state === false){
                        return res.status(400).json({
                            ok: false,
                            body: `El usuario ${modelo.nombre} esta dado de baja en la base de datos`
                        })
                    }

                break;

            default:
                    return res.status(500).json({
                        ok: false,
                        body: 'Aun no programo esto'
                    })           
        }

        //Limpiar imagenes previas
        if(modelo.img){

            // Borrar la imagen del servidor
            const nombreArr = modelo.img.split('/')
            const nombre = nombreArr[ nombreArr.length - 1]
            const [ public_id ] = nombre.split('.')

            await cloudinary.uploader.destroy(public_id)
        }

        const { tempFilePath } = req.files.archivo

        const { secure_url } = await cloudinary.uploader.upload( tempFilePath )            

        modelo.img = secure_url

        await modelo.save()

        res.json(
            modelo
        )

    } catch(error) {
        
        res.status(400).json({
            ok: false,
            body: error
        })


    }

}

const mostrarImagen = async (req, res = response) => {

    try {
        
        const { id, coleccion} = req.params
        
        let modelo

        switch (coleccion) {
            case 'usuarios':
                    modelo = await Usuario.findById(id)

                    if(!modelo){
                        return res.status(400).json({
                            ok: false,
                            body: `No existe un usuario con el id ${id}`
                        })
                    }

                    if(modelo.state === false){
                        return res.status(400).json({
                            ok: false,
                            body: `El usuario ${modelo.nombre} esta dado de baja en la base de datos`
                        })
                    }

                    

                break;

            case 'productos':
                    
                    modelo = await Producto.findById(id)

                    if(!modelo){
                        return res.status(400).json({
                            ok: false,
                            body: `No existe un producto con el id ${id}`
                        })
                    }

                    if(modelo.state === false){
                        return res.status(400).json({
                            ok: false,
                            body: `El producto ${modelo.nombre} esta dado de baja en la base de datos`
                        })
                    }

                break;

            default:
                    return res.status(500).json({
                        ok: false,
                        body: 'Aun no programo esto'
                    })           
        }

        //Limpiar imagenes previas
        if(modelo.img){

            // Borrar la imagen del servidor
            const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img )

            if(fs.existsSync(pathImagen)){
                return res.sendFile( pathImagen ) // devolver imagen
            }
        }

        const pathImagen = path.join( __dirname, '../assets/no-image.jpg' )                
            
        return res.sendFile( pathImagen ) // devolver imagen
                                

    } catch(error) {
        res.status(400).json({
            ok: false,
            body: error
        })

    }

}

module.exports = {
    cargarArchivos,
    actualizarImagenUser,
    mostrarImagen,
    actualizarImagenCloudinary
}