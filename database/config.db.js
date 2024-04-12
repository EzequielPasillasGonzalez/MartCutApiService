const mongoose = require('mongoose');


const dbconnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN) // Todo: Conectar a la base de datos
        console.log('Base de datos arriba');
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos')
    }
}


module.exports = {
    dbconnection
}