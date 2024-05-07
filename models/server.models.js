const express = require('express')
const cors = require('cors');
const express_fileupload = require('express-fileupload');

const { dbconnection } = require('../database/config.db')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.paths = { //Path para las rutas
            autenticar     : '/api/autenticar',
            buscar         : '/api/buscar',
            tipoProducto      : '/api/tipoProducto',
            productos      : '/api/productos',
            rol            : '/api/rol',
            uploads        : '/api/uploads',
            usuario        : '/api/usuario',
            emprendimiento : '/api/emprendimiento',
            tipoEmprendimiento : '/api/tipoEmprendimiento',
            centrosUniversitarios: '/api/centrosUniversitarios',
            estatus: '/api/estatus'
        }

        this.server = require('http').createServer(this.app)
        
        //Todo: Conectar a la base de datos
        this.connectDB()

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
        this.app.use(this.paths.autenticar, require('../routes/auth.routes'))
        // this.app.use(this.paths.buscar, require('../routes/search.routes'))
        this.app.use(this.paths.tipoProducto, require('../routes/tipo_producto.routes'))
        this.app.use(this.paths.tipoEmprendimiento, require('../routes/tipo_emprendimiento.routes'))
        //this.app.use(this.paths.emprendimiento, require('../routes/user.routes'))
        // this.app.use(this.paths.productos, require('../routes/products.routes'))
        this.app.use(this.paths.rol, require('../routes/role.routes'))
        // this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
        this.app.use(this.paths.usuario, require('../routes/user.routes'))
        this.app.use(this.paths.estatus, require('../routes/estatus.routes'))
        this.app.use(this.paths.centrosUniversitarios, require('../routes/centros_universitarios.routes'))
    }

    listen() {
        this.server.listen(this.port, () => console.log(`Example app listening on port ${this.port}`))
    }
}

module.exports = Server