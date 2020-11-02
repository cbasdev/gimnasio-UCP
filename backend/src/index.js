import app from './app/app'

const $serverPort = process.env.PORT || 3000

// La aplicación Backend se ejecuta en el puerto 3000
app.listen($serverPort, () => {
  console.log(`Server on port ${$serverPort}`)
})
