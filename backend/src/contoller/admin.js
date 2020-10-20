import {encryptPassword , getToken} from '../utils/authentication'
import Admin from '../database/lib/admin'
const admin  = Admin()


async function createAdmin(req,res){
    let {name_admin,email,password,id_gym} = req.body
    try{
        let password_encrypted = await encryptPassword(password)
        let newAdmin = await admin.createAdmin(name_admin,email,password_encrypted,id_gym)
        let token = await getToken(newAdmin)
        return res.status(201).send({
            newAdmin,token
        })

    }catch(err){
        return res.status(500).send({
            message : 'Problemas al crear el administrador',
            ok: false
        })
    }
    
}


module.exports = {
    createAdmin
}