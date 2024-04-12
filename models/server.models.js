const express = require('express')
const cors = require('cors');
const express_fileupload = require('express-fileupload');

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.paths = { //Path para las rutas

        }

        this.server = require('http').createServer(this.app)
        
        //Todo: Middlewares
        this.middlewares()

        //Todo: rutas de la aplicacion
        this.routes()

        
    }

    
}