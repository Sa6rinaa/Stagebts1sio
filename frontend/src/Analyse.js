import React, { useState } from 'react'
import axios from 'axios'

function AnalyseurTexte() {
  const [texte, setTexte] = useState('')
  const [resultats, setResultats] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3333/analyser', { texte })
      setResultats(res.data)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div className="section">
      <h2>Analyse</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Écris ta phrase ici..."
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          style={{ width: '100%', maxWidth: '500px' }}
        />
        <br />
        <button type="submit">Analyser</button>
      </form>

      {resultats && (
        <div style={{ marginTop: '1.5rem', textAlign: 'left' }}>
          <p><strong>Nombre de mots :</strong> {resultats.nbMots}</p>
          <p><strong>Mot le plus long :</strong> {resultats.motLePlusLong}</p>
          <p><strong>Voyelles :</strong> {resultats.voyelles}</p>
          <p><strong>Consonnes :</strong> {resultats.consonnes}</p>
        </div>
      )}
    </div>
  )
}

export default AnalyseurTexte
