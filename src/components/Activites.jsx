import Reveal from './Reveal'

const activites = [
  { icon: '🏊', label: 'Baignade en eau cristalline' },
  { icon: '🤿', label: 'Snorkeling · masque & tuba fournis' },
  { icon: '🛶', label: 'Kayak gratuit' },
  { icon: '🏄', label: 'Paddle gratuit' },
  { icon: '🏝️', label: 'Découverte des paysages' },
  { icon: '☀️', label: 'Farniente sur la plage' },
  { icon: '📸', label: '10 photos souvenirs offertes' },
  { icon: '🎥', label: 'Vidéo GoPro Hero 13 · 5 min offerte' },
]

export default function Activites() {
  return (
    <section id="activites" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Tout est prévu</p>
          <h2 className="section-title">Compris dans votre journée</h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activites.map((a, i) => (
            <Reveal key={a.label} delay={(i % 4) * 80}>
              <div className="card card-hover h-full text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-turquoise/10 text-3xl">
                  {a.icon}
                </div>
                <p className="font-medium text-deep">{a.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Option payante — Bateau annexe */}
        <Reveal delay={120} className="mt-8">
          <div className="card card-hover relative overflow-hidden border-gold/30 bg-gradient-to-br from-white to-sand/50">
            <span className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-deep">
              Option
            </span>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-4xl">
                🚤
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-deep">
                  Balade en bateau annexe
                </h3>
                <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-deep/75">
                  <li>👥 Groupe de 5 personnes max</li>
                  <li>⏱️ Durée : 30 min</li>
                </ul>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-display text-3xl font-bold text-gold">100 DT</p>
                <p className="text-sm text-deep/60">/ groupe</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Option payante — Scuba Diving */}
        <Reveal delay={160} className="mt-5">
          <div className="card card-hover relative overflow-hidden border-turquoise/30 bg-gradient-to-br from-white to-turquoise/5">
            <span className="absolute right-5 top-5 rounded-full bg-turquoise px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Nouveau
            </span>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-turquoise/15 text-4xl">
                🤿
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-deep">
                  Plongée sous-marine (Scuba Diving)
                </h3>
                <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-deep/75">
                  <li>👤 Selon disponibilité</li>
                </ul>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-display text-xl font-bold text-turquoise">À discuter</p>
                <p className="text-sm text-deep/60">sur WhatsApp</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
