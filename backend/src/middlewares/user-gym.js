import pool from '../database/database'

async function userExist(req,res,next){
    let {id_user,name_user,dni,id_gym} = req.body
    if (!id_user || !name_user || !dni || !id_gym) return res.status(400).send({
        message: 'Faltan argumentos',
        ok:false
    })
    try{
        let query = await pool.query('SELECT * FROM user_gym WHERE dni = $1',[dni])
        let {rows} = query
        if(rows.length > 0) return res.status(404).send({
            message:'El usuario ya existe',
            ok:false
        })
        next()
    } catch(err){
        
        return res.status(500).send({
            
            message : 'Error al almacenar el usuario',
            ok:false
        })
    }
}


module.exports = {
    userExist
}