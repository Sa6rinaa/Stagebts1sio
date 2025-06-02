import { DateTime } from 'luxon'
import Hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

// Mixin pour la gestion de l'auth (email + password)
const AuthFinder = withAuthFinder(() => Hash.use('scrypt'), {
  uids: ['email'], // champs utilisé pour identification
  passwordColumnName: 'password', // colonne du mot de passe dans la table
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  // Tu avais fullName nullable, j'ai laissé pareil.
  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null }) // pas exposé en JSON
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  // Gestion des access tokens via la table dédiée d'Adonis
  static accessTokens = DbAccessTokensProvider.forModel(User)
}
