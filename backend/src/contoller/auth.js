
import { verifyPassword, getToken } from '../utils/authentication'
import pool from '../database/database'
async function login(req, res) {
    let { email, password } = req.body
    if (!email || !password)
        return res.status(400).send({
            message: 'Faltan argumentos',
            ok: false
        })
    try {
        let query = await pool.query('SELECT * FROM admin WHERE email = $1', [email])
        let { rows } = query
        if (rows.length == 0) return res.status(401).send({ message: 'El usuario no existe' })
        let admin = rows[0]
        let passwordEncrypted = admin.password
        delete admin['password']
        let isCorrectPassword = await verifyPassword(password, passwordEncrypted)
        if (isCorrectPassword) {
            let token = await getToken(admin)
            return res.status(200).send({
                token
            })
        }
        return res.status(401).send({
            message: 'El usuario no existe'
        })
    } catch (err) {
        return res.status(500).send({
            message: 'Error al ingresar',
            ok: false
        })
    }

}


module.exports = {
    login
}