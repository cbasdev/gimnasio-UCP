import UserGym from '../database/lib/user-gym'
const userGym = UserGym()

async function userExist(req,res,next){
	let {name_user,dni,id_gym,date_in,last_date_in,acumulated_suscription} = req.body
    if ( !name_user || !dni || !id_gym || !last_date_in || !date_in || !acumulated_suscription) return res.status(400).send({
        message: 'Faltan argumentos',
        ok:false
    })
    try{
        let user = await userGym.getUserByDni(dni)
        if (!user) return next()
        return res.status(404).send({
            message:'El usuario ya existe',
            ok:false
        })
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
