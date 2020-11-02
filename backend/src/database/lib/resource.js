import pool from '../database'

// Diferentes metodos que interactuan con la base de datos

module.exports = function () {
  async function getResources() {
    let resources = await pool.query('SELECT * FROM resource')
    return resources.rows
  }

  async function getResourceById(id_resource) {
    let resource = await pool.query(
      'SELECT * FROM resource WHERE id_resource = $1',
      [id_resource]
    )
    return resource.rows[0]
  }

  async function deleteResource(id_resource) {
    let query = await pool.query(
      'DELETE FROM resource WHERE id_resource = $1',
      [id_resource]
    )
    return query.rowCount ? true : false
  }

  async function updateResource(
    id_resource,
    name_resource,
    description,
    id_gym,
    reference
  ) {
    let query = await pool.query(
      'UPDATE resource SET  name_resource = $1 , description = $2 , id_gym = $3 ,reference = $4 WHERE id_resource = $5 ',
      [name_resource, description, id_gym, reference, id_resource]
    )
    if (!query.rowCount) return null
    return await getResourceById(id_resource)
  }
  async function createResource(reference, name_resource, description, id_gym) {
    await pool.query(
      'INSERT INTO resource (reference,name_resource,description,id_gym) VALUES ($1,$2,$3,$4)',
      [reference, name_resource, description, id_gym]
    )
    return await getResourceByReference(reference)
  }
  async function getResourceByReference(reference) {
    let resource = await pool.query(
      'SELECT * FROM resource WHERE reference = $1',
      [reference]
    )
    return resource.rows[0]
  }

  return {
    getResources,
    getResourceById,
    createResource,
    updateResource,
    deleteResource,
    getResourceByReference,
  }
}
