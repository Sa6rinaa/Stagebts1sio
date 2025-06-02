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

// import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})


// const AuthController = () => import('#controllers/auth_controller')

// router.group(() => {
//   router.post('register', [AuthController, 'register'])
//   router.post('login', [AuthController, 'login'])

// }).prefix('user')
  // version new :
  
// import router from '@adonisjs/core/services/router'

// router.get('/', async () => {
//   return {
//     hello: 'world',
//   }
// })




router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
}).prefix('user')




// router.get('/RandomNumber', async ({ response }) => {
//   const number = Math.floor(Math.random() * 5) + 1
//   return response.send({ number })
// })



// const mots: Record<string, number> = {
//   bonjour: 42,
//   salut: 7,
//   test: 99,
// }

// router.post('/Champ', async ({ request, response }) => {
//   const text = request.input('text')?.toLowerCase().trim();

//   const mots: Record<string, number> = {
    
//     'our': 5,
//     'ion': 3,
//     'ment': 7,
//   }
  

// function FinMot(word: string) {
//   for (const ending in mots) {
//     if (word.endsWith(ending)) {
//       return mots[ending];
//     }
//   }
//   return 1;
// }
// const number = FinMot(text);

// return response.send({ number });
// });


// router.post('/Inverse', async ({ request, response }) => {
//   const texte = request.input('texte')?.toString() ?? ''
//   const texteInverse = texte.split('').reverse().join('')
//   return response.send({ original: texte, inverse: texteInverse })
// })




// function compterVoyelles(str: string): number {
//   return (str.match(/[aeiouy]/gi) || []).length
// }

// function compterConsonnes(str: string): number {
//   return (str.match(/[bcdfghjklmnpqrstvwxz]/gi) || []).length
// }

// router.post('/analyser', async ({ request, response }) => {
//   const texte: string = request.input('texte')?.toString().trim() ?? ''

//   const mots = texte.split(/\s+/).filter(m => m.length > 0)
//   const nbMots = mots.length
//   const motLePlusLong = mots.reduce((longest, mot) =>
//     mot.length > longest.length ? mot : longest, '')

//   const voyelles = compterVoyelles(texte)
//   const consonnes = compterConsonnes(texte)

//   return response.send({
//     nbMots,
//     motLePlusLong,
//     voyelles,
//     consonnes,
//   })
// })








// const motsSecrets = ['chat', 'chien', 'poule', 'lapin', 'tigre']

// // Fonction pour comparer deux mots et retourner le nombre de lettres bien placées
// // et le nombre de lettres présentes mais mal placées.
// function comparerMots(secret: string, proposition: string) {
//   const longueur = secret.length
//   let bienPlaces = 0
//   let malPlaces = 0

//   const secretUsed = Array(longueur).fill(false)
//   const propUsed = Array(longueur).fill(false)

//   // 1. Compter les lettres bien placées
//   for (let i = 0; i < longueur; i++) {
//     if (secret[i] === proposition[i]) {
//       bienPlaces++
//       secretUsed[i] = true
//       propUsed[i] = true
//     }
//   }

//   // 2. Compter les lettres mal placées
//   for (let i = 0; i < longueur; i++) {
//     if (propUsed[i]) continue
//     for (let j = 0; j < longueur; j++) {
//       if (secretUsed[j]) continue
//       if (proposition[i] === secret[j]) {
//         malPlaces++
//         secretUsed[j] = true
//         propUsed[i] = true
//         break
//       }
//     }
//   }

//   return { bienPlaces, malPlaces }
// }

// router.post('/MotMyst', async ({ request, response }) => {
//   const proposition = request.input('mot')?.toLowerCase() ?? ''
//   const secret = motsSecrets[Math.floor(Math.random() * motsSecrets.length)]

//   if (proposition.length !== secret.length) {
//     return response.badRequest({ message: `Le mot doit faire ${secret.length} lettres.` })
//   }

//   const resultat = comparerMots(secret, proposition)

//   const gagne = resultat.bienPlaces === secret.length

//   return response.send({
//     secret: gagne ? secret : null,
//     bienPlaces: resultat.bienPlaces,
//     malPlaces: resultat.malPlaces,
//     gagne,
//     message: gagne ? "Félicitations ! Vous avez trouvé le mot." : "Continuez à deviner !",
//   })
// })





