import express from 'express'
import auth from '../routes/auth'
import adminRouter from '../routes/admin'
import userGymRouter from '../routes/user-gym'
import resourceRouter from '../routes/resource'
import morgan from 'morgan'


// Inicialización
const app = express()
// Configuraciónes

//Para poder leer los archivos en .json
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//Routes
require('../auth/auth')

app.use('/api/auth', auth)
app.use('/api',adminRouter)
app.use('/api',userGymRouter)
app.use('/api',resourceRouter)
export default app
