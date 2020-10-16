import bcrypt from 'bcrypt'
const saltround = 1

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltround)
  return bcrypt.hash(password, salt)
}

const verifyPassword = async (password, passwordEncrypted) => {
  return bcrypt.compareSync(password, passwordEncrypted)
}

module.exports = { encryptPassword, verifyPassword }
