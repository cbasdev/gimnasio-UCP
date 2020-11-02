import { Pool } from 'pg'

import environment from '../env/environment'

// Conexión con la base de datos
const $db = environment

let pool = null
if (!pool) pool = new Pool($db)

module.exports = pool
