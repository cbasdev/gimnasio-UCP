import moment from 'moment'
import UserGym from '../database/lib/user-gym'

const userGym = UserGym()


async function createUserGym(req,res){
    let date_in = moment().format('YYYY-MM-DD')
    let {id_user,name_user,dni,id_gym} = req.body
    try{
        let user = await userGym.createUser(id_user,name_user,dni,id_gym,date_in)
        return res.status(201).send({
            message : 'Usuario almacenado exitosamente',
            user
        })
    } catch(err){
        return res.status(500).send({
            message : 'Error al almacenar el usuario'
        })
    }
    
}


async function listUsers(req,res){
    try{

        let users = await userGym.getUsers()
        return res.status(200).send({
            users
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

        let user = await userGym.updateUser(id_user,name_user,dni)
        if(!user) return res.status(404).send({
            message:'El id del usuario no existe'
        })
        return res.status(200).send({
            message:'Usuario actualizado de manera correcta',
            user
        })


    }catch(err){
        return res.status(500).send({
            message: 'Error al actualizar el usuario',
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
        let query = await userGym.deleteUser(dni)
        if(!query) return res.status(400).send({
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

async function getUser(req,res){
    
    let {dni} = req.params

    try{
        let user = await userGym.getUserByDni(dni)
        if(!user) user = {}
        return res.status(200).send({
            user : user
        
        })
    }catch(err){
        return res.status(500).send({
            message : 'Error al listar usuario',
            ok:false
        })
    }

}


module.exports = {
    createUserGym,
    listUsers,
    updateUser,
    deleteUser,
    getUser
}