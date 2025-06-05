import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setError('Vous devez être connecté pour accéder à cette page.')
      return
    }

    axios.get('http://localhost:3333/admin/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUsers(res.data.users)
    })
    .catch(err => {
      console.error('Erreur chargement users', err)
      if (err.response && err.response.status === 401) {
        setError('Session expirée ou non autorisée. Veuillez vous reconnecter.')
      } else {
        setError('Erreur lors du chargement des utilisateurs.')
      }
    })
  }, [])

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>
  }

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.fullName} ({user.email}) - Rôle: {user.role}
            </li>
          ))}
        </ul>
      )}
    </div>

)
}

export default AdminUsers