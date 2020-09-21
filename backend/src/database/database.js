import { Pool } from 'pg'

import { environment } from '../../env/environment'

const $db = environment.db

export const pool = new Pool($db)
