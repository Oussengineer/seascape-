import { useEffect, useState } from 'react'

const liens = [
  { label: 'Accueil', id: 'hero' },
  { label: 'À propos', id: 'apropos' },
  { label: 'Notre activité', id: 'programme' },
  { label: 'Tarifs', id: 'tarifs' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const aller = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const solide = scrolled || open

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solide ? 'bg-white/95 shadow-md backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        {/* Logo */}
        <button
          onClick={() => aller('hero')}
          className={`flex items-center gap-2 font-display text-lg font-bold transition-colors sm:text-xl ${
            solide ? 'text-deep' : 'text-white'
          }`}
        >
          <span className="text-xl">🌊</span>
          Seascape
          <span className={solide ? 'text-turquoise' : 'text-turquoise-light'}>Expeditions</span>
        </button>

        {/* Liens desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {liens.map((l) => (
            <button
              key={l.id}
              onClick={() => aller(l.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                solide
                  ? 'text-deep/80 hover:bg-deep/5 hover:text-deep'
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => aller('reservation')}
            className="ml-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-deep shadow-md transition-all hover:-translate-y-0.5 hover:bg-gold/90"
          >
            Réserver
          </button>
        </div>

        {/* Bouton burger mobile */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className={`flex h-10 w-10 items-center justify-center rounded-lg lg:hidden ${
            solide ? 'text-deep' : 'text-white'
          }`}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Menu mobile déroulant */}
      <div
        className={`overflow-hidden bg-white transition-[max-height] duration-300 lg:hidden ${
          open ? 'max-h-96 border-t border-deep/5' : 'max-h-0'
        }`}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {liens.map((l) => (
            <button
              key={l.id}
              onClick={() => aller(l.id)}
              className="rounded-lg px-4 py-3 text-left font-medium text-deep/80 transition-colors hover:bg-deep/5"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => aller('reservation')}
            className="mt-2 rounded-full bg-gold px-5 py-3 text-center font-semibold text-deep"
          >
            Réserver ma place
          </button>
        </div>
      </div>
    </nav>
  )
}
