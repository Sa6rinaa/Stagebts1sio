import axios from 'axios'
import { useState } from 'react'

function Champ() {
  const [text, setText] = useState('')
  const [number, setNumber] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3333/Champ', { text })
      setNumber(response.data.number)
    } catch (error) {
      console.error('Erreur:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Écris un mot..." 
        />
        <button type="submit">Envoyer</button>
      </form>
      {number !== null && <p>Nombre reçu : {number}</p>}
    </div>
  )
}

export default Champ;
