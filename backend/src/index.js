import app from './app/app'

const $serverPort = process.env.PORT || 3000

app.listen($serverPort, () => {
  console.log(`Server on port ${$serverPort}`)
})
