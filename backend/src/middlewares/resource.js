import Resource from '../database/lib/resource'

let resource = Resource()

// Si un recurso existe, no lo crea de nuevo

async function resourceExist(req, res, next) {
  let { reference } = req.body
  const query = await resource.getResourceByReference(reference)
  if (query)
    return res.status(400).send({
      message: 'El recurso ya existe',
      ok: false,
    })
  next()
}

module.exports = {
  resourceExist,
}
