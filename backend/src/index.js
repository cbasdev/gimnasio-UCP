import app from './app/app'
import { environment } from '../env/environment'

const $serverPort = environment.serverPort

app.listen($serverPort, () => {
  console.log(`Server on port ${$serverPort}`)
})
