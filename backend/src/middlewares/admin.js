import Admin from '../database/lib/admin'
const admin = Admin()

async function adminExist (req,res,next){
    let {name_admin,email,password,id_gym} = req.body
    if (!name_admin || !email || !password || !id_gym)
        return res.status(400).send({
            message : 'Faltan argumentos',
            ok: false
        })
    try{

        let query = await admin.getAdminByEmail(email)

        if(query.length > 0)
            return res.status(400).send({
                message: 'El administrador ya se encuentra registrado',
                ok: false
            })
        next()

    }catch(err){
    console.log(err);
    return res.status(500).send({
        message : 'Error al crear administrador'
    })
    }

}

module.exports = {
    adminExist
}