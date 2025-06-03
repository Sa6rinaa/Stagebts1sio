import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
      setIsAdmin(false)
      return
    }

    try {
      const parsedUser = JSON.parse(user)
      if (parsedUser.role === 'admin') {
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
      }
    } catch {
      setIsAdmin(false)
    }
  }, [])

  // Pendant le chargement
  if (isAdmin === null) return <div>Chargement...</div>

  // Si pas admin → rediriger
  if (!isAdmin) return <Navigate to="/" />

  // Sinon, afficher la page protégée
  return children
}

export default AdminRoute
