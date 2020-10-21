import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const saltround = 10

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltround)
  return await bcrypt.hash(password, salt)
}

const verifyPassword = async (password, passwordEncrypted) => {
  return bcrypt.compareSync(password, passwordEncrypted)
}

const getToken = async (data) => {
  let token = await jwt.sign(data,'privatekey')
  return token
}

module.exports = { encryptPassword, verifyPassword , getToken}
