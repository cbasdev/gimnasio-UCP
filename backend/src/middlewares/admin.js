import Admin from '../database/lib/admin'
const admin = Admin()

async function adminExist (req,res,next){
    let {id_admin,name_admin,email,password,id_gym} = req.body
    if (!id_admin || !name_admin || !email || !password || !id_gym)
        return res.status(400).send({
            message : 'Faltan argumentos',
            ok: false
        })
    try{

        let query = await admin.getAdminByIdOremail(id_admin,email)

        if(query.length > 0)
            return res.status(400).send({
                message: 'El usuario ya se encuentra registrado',
                ok: false
            })
        next()

    }catch(err){
    return res.status(500).send({
        message : 'Error al crear usuarios'
    })
    }

}

module.exports = {
    adminExist
}