/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from "@adonisjs/core/services/router"
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
}).prefix('user')

router.get('/me', async (ctx: HttpContext) => {
  const user = ctx.auth.user

  if (!user) {
    return ctx.response.unauthorized({ message: 'Non connecté' })
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  }
}).use([middleware.auth()])

router.get('/admin/users', async ({ auth, response }: HttpContext) => {
  if (auth.user?.role !== 'admin') {
    return response.unauthorized({ message: 'Accès interdit' })
  }

  const users = await db.from('users').select('id', 'full_name as fullName', 'email', 'role')
  return { users }
})



