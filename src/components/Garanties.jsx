import Reveal from './Reveal'

const garanties = [
  {
    icon: '⛵',
    titre: 'Bateau équipé',
    desc: 'Confort, espace ombragé & sécurité à bord',
  },
  {
    icon: '👨‍✈️',
    titre: 'Équipe professionnelle',
    desc: 'Skipper & accompagnateurs expérimentés',
  },
  {
    icon: '🛟',
    titre: 'Sécurité',
    desc: 'Maître-nageur présent · surveillance dédiée des enfants',
  },
  {
    icon: '🎟️',
    titre: 'Places limitées',
    desc: 'Réservation obligatoire',
  },
]

export default function Garanties() {
  return (
    <section id="garanties" className="bg-deep py-20 text-white sm:py-24">
      <div className="container-x">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {garanties.map((g, i) => (
            <Reveal key={g.titre} delay={i * 90}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-turquoise/40 hover:bg-white/10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-turquoise/15 text-3xl">
                  {g.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{g.titre}</h3>
                <p className="mt-2 text-sm text-turquoise-light/90">{g.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
