import Resource from '../database/lib/resource'

let resource =  Resource()

async function resourceExist(req,res,next){
    let {id_resource} = req.body
    const query = await resource.getResourceById(id_resource)
    if (query) return res.status(400).send({
        message:'El recurso ya existe',
        ok:false
    })
    next()

}

module.exports = {
    resourceExist
}