import Reveal from './Reveal'

const chiffres = [
  { valeur: '09h → 19h', label: 'Une journée complète en mer' },
  { valeur: '100%', label: 'Cuisine faite maison & locale' },
  { valeur: 'Cap Bon', label: 'Eaux cristallines d’El Haouaria' },
  { valeur: 'Places limitées', label: 'Une expérience intimiste' },
]

export default function Apropos() {
  return (
    <section id="apropos" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texte */}
          <Reveal>
            <p className="eyebrow">À propos de nous</p>
            <h2 className="section-title">
              Votre dose de <span className="text-turquoise">Vitamine Sea</span>
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-deep/75">
              <p>
                Seascape Expeditions, c’est une journée d’évasion au départ d’El
                Haouaria, à la pointe du Cap Bon. Embarquez pour vivre la
                Méditerranée autrement : eaux turquoise, criques préservées et
                table généreuse face à la mer.
              </p>
              <p>
                Entre baignade, snorkeling, kayak et farniente, nous prenons soin
                de tout — bateau confortable, équipe attentionnée et cuisine
                tunisienne faite maison. Vous n’avez plus qu’à profiter.
              </p>
            </div>
            <button
              onClick={() => document.getElementById('programme')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-deep px-7 py-3.5 font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-deep/90"
            >
              Découvrir le programme →
            </button>
          </Reveal>

          {/* Visuel décoratif */}
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep via-deep to-turquoise/70 p-10 text-white shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(144,224,239,0.4),transparent_55%)]" />
              <svg
                className="pointer-events-none absolute -bottom-2 left-0 w-full text-white/10"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,64 L1440,120 L0,120 Z"
                />
              </svg>
              <div className="relative">
                <span className="text-5xl">⛵</span>
                <p className="mt-4 font-display text-2xl font-bold leading-snug">
                  « La mer, le soleil et le partage — tout ce qu’il faut pour une
                  journée inoubliable. »
                </p>
                <p className="mt-4 text-turquoise-light">— L’équipe Seascape</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bandeau chiffres-clés */}
        <Reveal delay={100} className="mt-16">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-deep/5 bg-deep/5 lg:grid-cols-4">
            {chiffres.map((c) => (
              <div key={c.label} className="bg-white px-6 py-8 text-center">
                <p className="font-display text-2xl font-bold text-turquoise sm:text-3xl">
                  {c.valeur}
                </p>
                <p className="mt-2 text-sm text-deep/65">{c.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
