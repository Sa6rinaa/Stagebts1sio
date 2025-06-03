import { BaseSchema } from '@adonisjs/lucid/schema'
import type { Knex } from 'knex'

export default class CreateUsersTable extends BaseSchema {
  static table = 'users'

  async up() {
    this.schema.createTable(CreateUsersTable.table, (table: Knex.TableBuilder) => {
      table.increments('id')
      table.string('full_name')
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.enum('role', ['admin', 'user']).defaultTo('user')

     
      table.timestamp('created_at', { useTz: true }).defaultTo(this.db.raw('CURRENT_TIMESTAMP'))
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.db.raw('CURRENT_TIMESTAMP'))
    })
  }

  async down() {
    this.schema.dropTable(CreateUsersTable.table)
  }
}




// import { BaseSchema } from '@adonisjs/lucid/schema'

// export default class UsersSchema extends BaseSchema {
//   protected tableName = 'users'

//   public async up() {
//     this.schema.createTable(this.tableName, (table) => {
//       table.increments('id').notNullable()
//       table.string('full_name').nullable()
//       table.string('email', 254).notNullable().unique()
//       table.string('password').notNullable()

//       table.timestamp('created_at').notNullable()
//       table.timestamp('updated_at').nullable()
//     })
//   }

//   public async down() {
//     this.schema.dropTable(this.tableName)
//   }
// }
