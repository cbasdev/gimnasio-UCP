import pool from '../database/database'
import moment from 'moment'


async function createUserGym(req,res){
    let date_in = moment().format('YYYY-MM-DD')
    console.log(date_in)
    let {id_user,name_user,dni,id_gym} = req.body
    try{
        await pool.query('INSERT INTO user_gym (id_user,name_user,dni,id_gym,date_in) VALUES ($1,$2,$3,$4,$5)',[id_user,name_user,dni,id_gym,date_in])
        return res.status(201).send({
            message : 'Usuario almacenado exitosamente'
        })
    } catch(err){
        console.debug(err)
        return res.status(500).send({
            message : 'Error al almacenar el usuario'
        })
    }
    
}


async function listUsers(req,res){
    try{
        let query = await pool.query('SELECT * FROM user_gym')
        let {rows} = query
        return res.status(200).send({
            users: rows
        })
    }catch(err){
        return res.status(500).send({
            message:'Error al listar los usuarios',
            ok:false
        })
    }
}


async function updateUser(req,res){
    let {id_user,name_user,dni} = req.body
    try{
        let query =  await pool.query('UPDATE user_gym SET name_user = $1 , dni = $2 WHERE id_user = $3',[name_user,dni,id_user])
        let {rowCount} = query
        if(!rowCount) return res.status(404).send({
            message:'El id del usuario no existe'
        })
        return res.status(200).send({
            message:'Usuario actualizado de manera correcta'
        })


    }catch(err){
        return res.status(500).send({
            message: 'error al actualizar el usuario',
            ok:false
        })
    }

}

async function deleteUser(req,res){
    let {dni} = req.body
    if (!dni) return res.status(400).send({
        message:'Faltan argumentos',
        ok:false
    })
    try{
        let query = await pool.query('DELETE FROM  user_gym WHERE dni = $1',[dni])
        let {rowCount} = query
        if(!rowCount) return res.status(404).send({
            message:"El usuario no existe"
        })
        return res.status(200).send({
            message : 'Usuario eliminado de manera correcta',
        })
    }catch(err){
        return res.status(500).send({
            message:'Error al eliminar usuario',
            ok:false
        })
    }

}


module.exports = {
    createUserGym,
    listUsers,
    updateUser,
    deleteUser
}