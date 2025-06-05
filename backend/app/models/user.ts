import { DateTime } from 'luxon'
import Hash from '@adonisjs/core/services/hash'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { ModelObject } from '@adonisjs/lucid/types/model'

export default class User extends BaseModel {
  static table = 'users'

  @column({ isPrimary: true })
  declare id: number

  // Tu avais fullName nullable, j'ai laissé pareil.
  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare role: string

  @column({ serializeAs: null }) // pas exposé en JSON
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Gestion des access tokens via la table dédiée d'Adonis
  static accessTokens = DbAccessTokensProvider.forModel(User)

  static async verifyCredentials(email: string, password: string) {
    const user = await this.query().where('email', email).firstOrFail()
    const isValid = await Hash.verify(user.password, password)
    
    if (!isValid) {
      throw new Error('Invalid credentials')
    }
    
    return user
  }

  static async create(data: Partial<ModelObject<User>>) {
    if (data.password) {
      data.password = await Hash.make(data.password)
    }
    return await super.create(data)
  }
}
