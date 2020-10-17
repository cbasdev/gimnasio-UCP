import UserGym from '../database/lib/user-gym'
const userGym = UserGym()

async function userExist(req,res,next){
    let {id_user,name_user,dni,id_gym} = req.body
    if (!id_user || !name_user || !dni || !id_gym) return res.status(400).send({
        message: 'Faltan argumentos',
        ok:false
    })
    try{
        let user = await userGym.getUserByDni(dni)
        console.log(user)
        if (!user) return next()
        return res.status(404).send({
            message:'El usuario ya existe',
            ok:false
        })
    } catch(err){
        console.log(err)
        return res.status(500).send({
            
            message : 'Error al almacenar el usuario',
            ok:false
        })
    }
}


module.exports = {
    userExist
}