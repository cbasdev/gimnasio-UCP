import { Pool } from 'pg'

import  environment  from '../env/environment'

const $db = environment 

export const pool = new Pool($db)
