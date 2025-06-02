import React, { useState } from 'react'
import axios from 'axios'

function MotMystere() {
  const [mot, setMot] = useState('')
  const [messages, setMessages] = useState([])
  const [etatPartie, setEtatPartie] = useState({ gagne: false, secret: null })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (etatPartie.gagne) return

    try {
      const res = await axios.post('http://localhost:3333/MotMyst', { mot })
      const { bienPlaces, malPlaces, gagne, message, secret } = res.data

      setMessages(prev => [
        ...prev,
        `Mot: "${mot}" → Bien placées: ${bienPlaces}, Mal placées: ${malPlaces}`
      ])

      setEtatPartie({ gagne, secret })

      setMot('')
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert('Erreur serveur')
      }
    }
  }

  return (
    <div className="section">
      <h2>Jeu du Mot Mystère</h2>
      {!etatPartie.gagne && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={mot}
            onChange={e => setMot(e.target.value.toLowerCase())}
            placeholder="Entrez un mot"
            disabled={etatPartie.gagne}
            style={{ textTransform: 'lowercase' }}
            required
          />
          <button type="submit">Deviner</button>
        </form>
      )}

      {etatPartie.gagne && (
        <div style={{ marginTop: '1rem', color: 'green', fontWeight: 'bold' }}>
          🎉 {etatPartie.secret} — Vous avez gagné !
        </div>
      )}

      <div style={{ marginTop: '1rem', textAlign: 'left' }}>
        <h3>Historique des tentatives :</h3>
        <ul>
          {messages.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MotMystere
