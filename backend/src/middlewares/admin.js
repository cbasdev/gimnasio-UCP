import pool from '../database/database'


async function adminExist (req,res,next){
    let {id_admin,name_admin,email,password,id_gym} = req.body
    if (!id_admin || !name_admin || !email || !password || !id_gym)
        return res.status(400).send({
            message : 'faltan argumentos',
            ok: false
        })
    try{

        let query = await pool.query('SELECT email FROM admin where email=$1 AND id_admin = $2',[email,id_admin])
        let rows = query.rows
        if(rows.length > 0)
            return res.status(400).send({
                message: 'El usuario ya se encuentra registrado',
                ok: false
            })
        next()

    }catch(err){
    return res.status(500).send({
        message : 'error al crear usuarios'
    })
    }

}

module.exports = {
    adminExist
}