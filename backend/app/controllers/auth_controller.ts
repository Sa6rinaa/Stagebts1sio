import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    try {
      // Validation des données via ton validateur custom
      const payload = await request.validateUsing(registerValidator)

      // Vérification si l'email existe déjà pour éviter doublons
      const existingUser = await User.findBy('email', payload.email)
      if (existingUser) {
        return response.conflict({ message: 'Cet email est déjà utilisé' })
      }

      // Création de l'utilisateur
      const user = await User.create(payload)
      const token = await User.accessTokens.create(user)
      
      return response.created({ token, user })
    } catch (error) {
      console.error(error)

      // Si erreur de validation spécifique
      if (error.messages) {
        return response.badRequest({ message: 'Données invalides', errors: error.messages })
      }

      // Sinon erreur générique
      return response.internalServerError({ message: 'Une erreur est survenue lors de l\'inscription' })
    }
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token: token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    })
  }
}


