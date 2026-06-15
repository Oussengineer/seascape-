import Reveal from './Reveal'
import useScrollReveal from '../hooks/useScrollReveal'

const arrivee = [
  { icon: '🍹', label: "Cocktail d'accueil" },
  { icon: '🐟', label: 'Sardines grillées' },
  { icon: '🌶️', label: 'Harissa artisanale' },
  { icon: '🥖', label: 'Pain Tabouna' },
  { icon: '🍅', label: 'Tomates séchées au soleil' },
]

const dejeuner = [
  { titre: 'Entrées', items: ['Salade tunisienne', 'Salade méchouia', 'Tastira'] },
  {
    titre: 'Plat principal',
    items: [
      'Pâtes Fell aux fruits de mer',
      'Poisson grillé du jour',
      'Alternative : Escalope de poulet',
    ],
  },
  { titre: 'Dessert', items: ['Plateau de fruits de saison', 'Thé à la menthe'] },
]

const notes = [
  { icon: '💧', text: 'Eau minérale incluse toute la journée', color: 'border-l-turquoise' },
  {
    icon: '🥗',
    text: "Menu végétarien adapté sur demande — merci de nous prévenir à l'avance.",
    color: 'border-l-gold',
  },
  {
    icon: '👩‍🍳',
    text: 'Tous nos mets sont faits maison, à partir d’ingrédients frais et locaux.',
    color: 'border-l-turquoise-light',
  },
]

/* Une étape de la timeline */
function Step({ time, title, badge, children, delay }) {
  return (
    <Reveal delay={delay} className="relative pl-16">
      {/* Pastille sur la ligne */}
      <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-turquoise bg-white text-xl shadow-sm">
        {badge}
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-turquoise">{time}</p>
      <h3 className="mt-1 font-display text-2xl font-bold text-deep">{title}</h3>
      <div className="mt-4 pb-12">{children}</div>
    </Reveal>
  )
}

export default function AccueilRepas() {
  const lineRef = useScrollReveal({ threshold: 0.05 })

  return (
    <section id="programme" className="bg-sand/40 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Notre activité</p>
          <h2 className="section-title">Le programme de la journée</h2>
          <p className="mt-3 text-lg text-deep/70">
            Une journée complète, de 09h00 à 19h00, rythmée par la mer et la table.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-3xl">
          {/* Ligne verticale animée */}
          <span
            ref={lineRef}
            className="timeline-line absolute left-[1.45rem] top-2 h-[calc(100%-3rem)] w-0.5 bg-gradient-to-b from-turquoise via-turquoise to-turquoise-light"
            aria-hidden="true"
          />

          <Step time="09h00" title="Départ d’El Haouaria" badge="🚤" delay={0}>
            <p className="text-deep/75">
              Accueil au port d’El Haouaria, briefing sécurité et embarquement.
              Cap sur les criques du Cap Bon.
            </p>
          </Step>

          <Step
            time="09h30 → 13h30 · Restaurant Garaga"
            title="Accueil gourmand"
            badge="🍹"
            delay={60}
          >
            <p className="mb-4 text-deep/75">À l’arrivée, on vous régale :</p>
            <ul className="space-y-2.5">
              {arrivee.map((a) => (
                <li key={a.label} className="flex items-center gap-3 text-deep/80">
                  <span className="text-xl">{a.icon}</span>
                  <span>{a.label}</span>
                </li>
              ))}
            </ul>
          </Step>

          <Step time="11h00" title="Activités en mer" badge="🏊" delay={60}>
            <p className="text-deep/75">
              Baignade en eau cristalline, snorkeling, kayak et paddle — masque &
              tuba fournis. <span className="text-deep/60">(Détail ci-dessous.)</span>
            </p>
          </Step>

          <Step time="13h00 → 15h00" title="Le déjeuner" badge="🍽️" delay={60}>
            <div className="space-y-5">
              {dejeuner.map((c) => (
                <div key={c.titre}>
                  <p className="font-semibold text-gold">{c.titre}</p>
                  <ul className="mt-1 space-y-1 text-deep/80">
                    {c.items.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-turquoise" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Step>

          <Step time="15h00 → 18h00" title="Farniente & baignade" badge="☀️" delay={60}>
            <p className="text-deep/75">
              Détente sur la plage, dernières baignades, paddle et photos
              souvenirs au soleil couchant.
            </p>
          </Step>

          <Step time="19h00" title="Retour au port" badge="🌅" delay={60}>
            <p className="text-deep/75">
              Retour à El Haouaria, des souvenirs plein la tête (et la GoPro).
            </p>
          </Step>
        </div>

        {/* Notes */}
        <Reveal delay={100} className="mx-auto mt-4 grid max-w-3xl gap-4 sm:grid-cols-3">
          {notes.map((n) => (
            <div key={n.text} className={`card border-l-4 ${n.color}`}>
              <p className="flex items-start gap-3 text-sm text-deep/85">
                <span className="text-xl">{n.icon}</span>
                {n.text}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
