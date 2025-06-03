import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3333/admin/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      setUsers(res.data.users)
    }).catch(err => {
      console.error('Erreur chargement users', err)
    })
  }, [])

  return (
    <div>
      <h1>Gestion des utilisateurs</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.fullName} ({user.email}) - Role: {user.role}</li>
        ))}
      </ul>
    </div>
  )
}

export default AdminUsers
