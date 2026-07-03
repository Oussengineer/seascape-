import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Apropos from './components/Apropos'
import Galerie from './components/Galerie'
import AccueilRepas from './components/AccueilRepas'
import Activites from './components/Activites'
import Tarifs from './components/Tarifs'
import Garanties from './components/Garanties'
import Contact from './components/Contact'
import Formulaire from './components/Formulaire'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const check = () => setIsAdmin(window.location.hash === '#admin')
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  if (isAdmin) return <AdminPanel />

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <main>
        <Apropos />
        <Galerie />
        <AccueilRepas />
        <Activites />
        <Tarifs />
        <Garanties />
        <Contact />
        <Formulaire />
      </main>
      <Footer />
    </div>
  )
}
