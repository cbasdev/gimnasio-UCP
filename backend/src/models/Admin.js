import { pool } from '../database/database'

export class Admin {
  constructor(name_admin, password) {
    this.name_admin = name_admin
    this.password = password
  }
}
