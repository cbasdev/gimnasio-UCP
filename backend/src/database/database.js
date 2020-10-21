import { Pool } from 'pg'

import  environment  from '../env/environment'


const $db = environment
//singleton
let pool = null
if(!pool) pool = new Pool($db)

module.exports = pool
