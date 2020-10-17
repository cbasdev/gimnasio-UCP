import pool from '../database/database'
import {encryptPassword , getToken} from '../utils/authentication'

async function createAdmin(req,res){
    let {id_admin,name_admin,email,password,id_gym} = req.body
    try{
        let password_encrypted = await encryptPassword(password)
        await pool.query('INSERT INTO admin (id_admin,name_admin,password,id_gym,email) VALUES ($1,$2,$3,$4,$5)',[id_admin,name_admin,password_encrypted,id_gym,email])
        let newAdmin = await pool.query('SELECT email,id_admin,name_admin FROM admin where email = $1',[email])
        let rows = newAdmin.rows[0]
        let token = await getToken(rows)
        console.log(token);
        return res.status(201).send({
            rows,token
        })

    }catch(err){
        console.log(err);
        return res.status(500).send({
            err,
            error : 'Problemas al crear el admin',
            ok: false
        })
    }
    
}


module.exports = {
    createAdmin
}