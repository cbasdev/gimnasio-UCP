import express from 'express'

// Routes

// Inicialización
const app = express()

// Configuraciónes

//Para poder leer los archivos en .json
app.use(express.json())

//Routes

export default app
