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
//Routes
require('../auth/auth')

app.use('/api/auth', auth)
app.use('/api',adminRouter)
app.use('/api',userGymRouter)
app.use('/api',resourceRouter)
export default app
