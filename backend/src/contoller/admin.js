import {encryptPassword , getToken} from '../utils/authentication'
import Admin from '../database/lib/admin'
const admin  = Admin()


async function createAdmin(req,res){
    let {id_admin,name_admin,email,password,id_gym} = req.body
    try{
        let password_encrypted = await encryptPassword(password)
        let newAdmin = await admin.createAdmin(id_admin,name_admin,email,password_encrypted,id_gym)
        let token = await getToken(newAdmin)
        console.log(token);
        return res.status(201).send({
            newAdmin,token
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