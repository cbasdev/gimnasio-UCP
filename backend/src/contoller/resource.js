import Resource from '../database/lib/resource'

const resource = Resource()


async function createResource(req,res){
    let {id_resource,name_resorce,description,id_gym} = req.body
    try{
        let new_resource  = await resource.createResource(id_resource,name_resorce,description,id_gym)
        return res.status(201).send({
            message: 'Recurso almacenado correctamente',
            resource: new_resource
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message : 'Error al crear el recurso'
        })
    }

}

async function listResources(req,res){
    
    try{
        let resources = await resource.getResources()
        return res.status(200).send({
            resources
        })

    }catch(err){
        return res.status(500).send({
            message:'Error al listar recursos',
            ok:false
        })
    }
    
}

async function updateResource(req,res){
    let {id_resource,name_resorce,description,id_gym} = req.body
    try{
        let resourceUpdated = await resource.updateResource(id_resource,name_resorce,description,id_gym)
        if(!resourceUpdated) return res.status(400).send({
            message:'El id del recurso no se encuentra',
            ok:false
        })
        return res.status(200).send({
            resourceUpdated
        })

    }catch(err){
        return res.status(500).send({
            message:'Error al actualizar el usuario'
        })
    }

}

async function deleteResource(req,res){
    let {id_resource} = req.body
    if(!id_resource) return res.status(400).send({
        message:'Faltan argumento',ok:false
    })
    try{
        let query = await resource.deleteResource(id_resource)
        if(!query) return res.status(400).send({
            message:'El recurso no existe'
        })
        return res.status(200).send({
            message:'El usuario ha sido eliminado'
        })

    }catch(err){
        return res.status(500).send({
            message: 'Error al eliminar el recurso'
        })
    }

}




module.exports = {
    createResource,
    listResources,
    updateResource,
    deleteResource
}
