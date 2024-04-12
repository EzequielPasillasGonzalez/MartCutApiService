const express = require('express')
const cors = require('cors');
const express_fileupload = require('express-fileupload');

const { dbconnection } = require('../database/config.db')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.paths = { //Path para las rutas
            auth     : '/api/auth'
        }

        this.server = require('http').createServer(this.app)
        
        //Todo: Middlewares
        this.middlewares()

        //Todo: rutas de la aplicacion
        this.routes()
        
    }

    async connectDB(){
        await dbconnection()
    }

    middlewares(){
        // CORS
        this.app.use(cors({
            origin: '*', // Puedes ajustar esto según tus necesidades
            methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
            credentials: true,
        }));

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio publico
        //this.app.use(express.static('public'))

        this.app.use(express_fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }    

    routes(){ //todo: Rutas 
        this.app.use(this.paths.auth, require('../routes/auth.router'))
    }

    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}`))
    }
}

module.exports = Server