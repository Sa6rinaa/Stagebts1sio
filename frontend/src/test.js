import './App.css'
import { useEffect, useState } from 'react'

function Test() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token) {
      window.location.href = '/auth'
    }

    if (user) {
      try {
        const parsedUser = JSON.parse(user)
        setUserName(parsedUser.fullName || '')
      } catch (err) {
        console.error('Erreur de parsing du user', err)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/auth'
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://blog.octo.com/pourquoi-sinteresser-a-react/image1.webp"
          alt="logo React"
          className="logo-img"
          title="Logo React"
        />
        <h1>Bienvenue {userName && `, ${userName}`} </h1>
        <p>Site React avec une interface moderne et fluide.</p>
      </header>

      <main className="App-content">
        <section className="section">
          <h2>Page d'accueil</h2>
          <p>
            Bienvenue sur ma page d'accueil. Vous y trouverez un aperçu des différentes activités proposées.
          </p>
          <p>
            L'objectif est de proposer des fonctionnalités simples, modernes et faciles à utiliser.
          </p>
        </section>
      </main>

      <footer className="App-footer">
        <p><i>Développé par Sabrina et Naylis pour la découverte de React</i></p>
      </footer>

      <button className="logout-button" onClick={handleLogout}> Se déconnecter</button>
    </div>
  )
}

export default Test
