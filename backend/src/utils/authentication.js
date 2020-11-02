import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const saltround = 10

// Este método encripta la contraseña con la libreria bcrypt
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltround)
  return await bcrypt.hash(password, salt)
}

// Este método encriptaverifica dos contraseñas, una encriptada y otra no
const verifyPassword = async (password, passwordEncrypted) => {
  return bcrypt.compareSync(password, passwordEncrypted)
}

// Este método obtiene un token de jwt
const getToken = async (data) => {
  let token = await jwt.sign(data, 'privatekey')
  return token
}

module.exports = { encryptPassword, verifyPassword, getToken }
