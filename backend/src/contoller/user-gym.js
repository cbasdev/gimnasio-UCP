import moment from 'moment'
import UserGym from '../database/lib/user-gym'

const userGym = UserGym()


async function createUserGym(req,res){

	let {name_user,dni,id_gym,date_in, acumulated_suscription,last_date_in } = req.body
    try{
        let user = await userGym.createUser(name_user,dni,id_gym,date_in,acumulated_suscription,last_date_in)
        return res.status(201).send({
            message : 'Usuario almacenado exitosamente',
            user
        })
    } catch(err){
        console.log(err)
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
    let {name_user,dni,new_dni} = req.body
    if(!new_dni) new_dni = dni
    try{

        let user = await userGym.updateUser(name_user,dni,new_dni)
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
    let {dni} = req.params
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


function verifyMonths(last_date_in,months){
    console.log(last_date_in)
    let date_now = moment()
    let date = moment(last_date_in,'YYYY-MM-DD')
		let date_add = moment(last_date_in,'YYYY-MM-DD')
		console.debug('date', date)
		date_now = date_now.add(1,'days')
    date_add = date_add.add(months,'months')
		console.log(date_add)
		console.debug(date_now.isBetween(date,date_add))
    return date_now.isBetween(date,date_add)
    
}

async function payMonth(req,res){
    let {pay_months} = req.body

    let date_now = moment().format('YYYY-MM-DD')
    let {dni} = req.params
    let user = await userGym.getUserByDni(dni)
    if (!user) return res.status(404).send({
        message:"El usuario no existe",
        ok:false
    })
    let {last_date_in,acumulated_suscription} = user
    
    if (!last_date_in) {
        last_date_in = date_now
        acumulated_suscription = '0'
    }
    acumulated_suscription = Number(acumulated_suscription)
    if (verifyMonths(last_date_in, acumulated_suscription)){
        acumulated_suscription += pay_months
    }
    else {
        acumulated_suscription = pay_months
        last_date_in = date_now
    }
    let userUpdated = await userGym.updateLastDateInAndAcumulatedSuscription(dni,last_date_in,acumulated_suscription)
    return res.status(200).send({
        message : 'Working in pay',
        user: userUpdated
})

 

}

module.exports = {
    createUserGym,
    listUsers,
    updateUser,
    deleteUser,
    getUser,
    payMonth
}
