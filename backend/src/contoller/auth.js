import { verifyPassword, getToken } from '../utils/authentication'
import Admin from '../database/lib/admin'

const dbAdmin = Admin()

// Los controladores de rutas
async function login(req, res) {
  let { email, password } = req.body
  if (!email || !password)
    return res.status(400).send({
      message: 'Faltan argumentos',
      ok: false,
    })
  try {
    let query = await dbAdmin.getAdminByEmail(email)
    if (query.length == 0)
      return res.status(401).send({ message: 'El usuario no existe' })
    let admin = query[0]
    let passwordEncrypted = admin.password
    delete admin['password']
    let isCorrectPassword = await verifyPassword(password, passwordEncrypted)
    if (isCorrectPassword) {
      let token = await getToken(admin)
      return res.status(200).send({
        token,
      })
    }
    return res.status(401).send({
      message: 'El usuario no existe',
    })
  } catch (err) {
    return res.status(500).send({
      message: 'Error al ingresar',
      ok: false,
    })
  }
}

module.exports = {
  login,
}
