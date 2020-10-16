import express from 'express'
import auth from '../routes/auth'
import passport from 'passport'

// Inicialización
const app = express()
// Configuraciónes

//Para poder leer los archivos en .json
app.use(express.json())

//Routes
require('../auth/auth')

app.use('/api/auth', auth)

export default app
