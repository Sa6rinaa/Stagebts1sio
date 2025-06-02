import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './App.css' // pour être sûr que le CSS s'applique

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3333/user/register', {
        fullName,
        email,
        password
      })
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.')
      navigate('/login')
    } catch (err) {
      setError(
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).join(', ')
          : 'Erreur lors de l’inscription'
      )
    }
  }

  return (
    <div className="section">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Nom complet"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          required
        />
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
        <button type="submit">S'inscrire</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Vous avez déjà un compte ?{' '}
        <span
          style={{ color: '#00c0ff', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate('/login')}
        >
          Connectez-vous ici
        </span>
      </p>
    </div>
  )
}

export default Register
