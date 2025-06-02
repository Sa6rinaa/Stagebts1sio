import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator } from '#validators/auth'
import { loginValidator } from '#validators/login'

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


  async login({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(loginValidator)
  
      const user = await User.findBy('email', payload.email)
      if (!user) {
        return response.badRequest({ message: 'Identifiants invalides' })
      }
  
      const isPasswordValid = await user.verifyPassword(payload.password)
      if (!isPasswordValid) {
        return response.badRequest({ message: 'Identifiants invalides' })
      }
  
      const token = await User.accessTokens.create(user)
  
      // Retourne token + infos utilisateur
      return response.ok({
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
        
        }
      })
    } catch (error) {
      console.error(error)
  
      if (error.messages) {
        return response.badRequest({ message: 'Données invalides', errors: error.messages })
      }
  
      return response.internalServerError({ message: 'Erreur lors de la connexion' })
    }
  }
}


