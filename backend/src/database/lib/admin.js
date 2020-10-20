import pool from '../database'

module.exports =  function (){

    async function createAdmin(name_admin,email,password,id_gym){
        await pool.query('INSERT INTO admin (name_admin,password,id_gym,email) VALUES ($1,$2,$3,$4)',[name_admin,password,id_gym,email])
        let newAdmin = await pool.query('SELECT email,id_admin,name_admin FROM admin where email = $1',[email])
        return newAdmin.rows[0]
 
    }

    async function getAdminByIdOremail(id_admin,email){
        let admin = await pool.query('SELECT email FROM admin where email=$1 OR id_admin = $2',[email,id_admin])
        return admin.rows

    }

    async function getAdminByEmail(email){
        let admin = await pool.query('SELECT * FROM admin WHERE email = $1', [email])
        return admin.rows

    }


    return {
        createAdmin,
        getAdminByIdOremail,
        getAdminByEmail
    }

}