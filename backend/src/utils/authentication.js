import bcrypt from 'bcrypt'
import { environment } from '../../env/environment'

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(environment.session.saltRounds)
  return bcrypt.hash(password, salt)
}

const verifyPassword = async (password, passwordEncrypted) => {
  return bcrypt.compareSync(password, passwordEncrypted)
}

module.exports = { encryptPassword, verifyPassword }
