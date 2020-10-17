import jwt from 'jsonwebtoken'

function isAuth(req,res,next){
    let {authorization} = req.headers
    if (!authorization) return res.status(400).send({
        message:'Sesión expirada',
        ok:false
    })
    let token = authorization.split(' ')[1]
    jwt.verify(token,'privatekey',(err,decoded)=>{
        if (err) return res.status(401).send({
            message:'Acceso denegado',
            ok:false
        })
       next()
    })

}

module.exports = {
    isAuth
}