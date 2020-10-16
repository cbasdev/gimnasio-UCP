import { pool } from '../database/database'

export class Admin {
  constructor(name_admin, email, password) {
    this.name_admin = name_admin
    this.email = email
    this.password = password
  }

  async saveAdmin() {
    try {
      console.log(this.password)
      const res = await pool.query(
        `
        insert into admin (name_admin, email, password, id_gym) values (
          '${this.name_admin}',
          '${this.email}',
          '${this.password}',
          1
          )`
      )
      return this
    } catch (error) {
      console.log(error)
      return {
        error: error,
      }
    }
  }

  async findByEmail() {
    try {
      const user = await pool.query(
        `
        select 
          *
          from admin 
          where email = '${this.email}'
          fetch first row only
        `
      )
      return user.rows
    } catch (error) {
      return {
        error: 'User not created',
        auth: false,
      }
    }
  }
}
