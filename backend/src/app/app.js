import express from 'express'
import auth from '../routes/auth'
// Routes

// Inicialización
const app = express()

// Configuraciónes

//Para poder leer los archivos en .json
app.use(express.json())

//Routes
app.use('/api/auth', auth)

export default app
