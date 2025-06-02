import React, { useState } from 'react'
import axios from 'axios'
import './App.css' // Assure-toi que le style global est bien importé

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3333/user/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      const user = JSON.parse(localStorage.getItem('user'));
      if (res.data.user.role === 'admin') {
        window.location.href = '/admin/dashboard'
      } else {
        window.location.href = '/Test'
      }

      alert('Connexion réussie !')
      window.location.href = '/Test'
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion')
    }
  }

  return (
    <div className="section">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit"> Se connecter</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Vous n’avez pas de compte ? <a href="/auth" style={{ color: '#00c0ff' }}>Créer un compte</a>
      </p>
    </div>
  )
}

export default Login
