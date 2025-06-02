import React, { useState } from 'react'
import axios from 'axios'

function ChiffreMystere() {
  const [nombre, setNombre] = useState('')
  const [message, setMessage] = useState('')
  const [historique, setHistorique] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nombre) return

    try {
      const res = await axios.post('http://localhost:3333/ChiffreMyst', {
        nombre: Number(nombre),
      })
      setMessage(res.data.message)
      setHistorique((prev) => [...prev, { nombre, message: res.data.message }])
      setNombre('')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur serveur')
    }
  }

  return (
    <div className="section">
      <h2>Jeu du Chiffre Mystère</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          min="1"
          max="100"
          placeholder="Devine un nombre entre 1 et 100"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <button type="submit">Deviner</button>
      </form>

      {message && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{message}</p>}

      {historique.length > 0 && (
        <>
          <h3>Historique des essais :</h3>
          <ul style={{ textAlign: 'left' }}>
            {historique.map((essai, i) => (
              <li key={i}>
                Nombre : {essai.nombre} — {essai.message}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default ChiffreMystere
