const path = require('path')
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise ((resolve, reject) => {      

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.')

        const extension = nombreCortado[ nombreCortado.length -1 ]

        // Validar la extension         
        if(!extensionesValidas.includes(extension)){

            return reject(`La extension ${extension} no es permitida, ${extensionesValidas}`)            
        }

        const nombreTemp = uuidv4() + '.' + extension

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp)

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }

            resolve(nombreTemp)
        });
    })

    
}

const coleccionesPermitidas = async ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes(coleccion)

    if( !incluida ){
        throw new Error(`La coleccion ${coleccion} no es permitida`)
    }

    return true
}

module.exports = {
    subirArchivo,
    coleccionesPermitidas
}