import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Apropos from './components/Apropos'
import AccueilRepas from './components/AccueilRepas'
import Activites from './components/Activites'
import Tarifs from './components/Tarifs'
import Garanties from './components/Garanties'
import Contact from './components/Contact'
import Formulaire from './components/Formulaire'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <main>
        <Apropos />
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
