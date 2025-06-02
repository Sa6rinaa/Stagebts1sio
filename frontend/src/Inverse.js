import React, { useState } from 'react'
import axios from 'axios'

function ConvertisseurTexte() {
  const [texte, setTexte] = useState('')
  const [texteInverse, setTexteInverse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3333/Inverse', { texte })
      setTexteInverse(res.data.inverse)
    } catch (error) {
      setTexteInverse("Erreur côté serveur.")
    }
  }

  return (
    <div className="section">
      <h2>Texte inversé</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          placeholder="Écris une phrase"
          value={texte}
          onChange={e => setTexte(e.target.value)}
        />
        <button type="submit">Inverser</button>
      </form>

      {texteInverse && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Résultat : {texteInverse}
        </p>
      )}
    </div>
  )
}

export default ConvertisseurTexte
