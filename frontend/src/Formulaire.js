import React, { useState } from 'react'
import axios from 'axios'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isLogin
      ? 'http://localhost:3333/user/login'
      : 'http://localhost:3333/user/register'

    try {
      const res = await axios.post(url, { email, password })
      if (isLogin) {
        localStorage.setItem('token', res.data.token)
        alert('Connexion réussie !')
      } else {
        alert('Inscription réussie ! Vous pouvez vous connecter.')
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isLogin ? 'Se connecter' : "S'inscrire"}</button>

      <p style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Pas encore inscrit ? S'inscrire" : 'Déjà un compte ? Se connecter'}
      </p>
    </form>
  )
}

export default AuthForm
