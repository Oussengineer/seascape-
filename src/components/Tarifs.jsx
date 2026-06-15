import Reveal from './Reveal'
import { PRICES, PLATS_SUPP } from '../config'

function formatPrix(valeur) {
  return valeur > 0 ? `${valeur} DT` : '— DT'
}

export default function Tarifs() {
  return (
    <section id="tarifs" className="bg-sand/40 py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Le prix de la journée</p>
          <h2 className="section-title">Tarifs</h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {/* Carte principale */}
          <Reveal>
            <div className="card card-hover overflow-hidden border-turquoise/20 p-0">
              <div className="bg-gradient-to-br from-deep to-turquoise/80 px-7 py-6 text-white">
                <h3 className="font-display text-2xl font-bold">Journée tout compris</h3>
                <p className="text-sm text-turquoise-light">
                  Repas, activités & encadrement inclus
                </p>
              </div>
              <ul className="divide-y divide-deep/5 px-7">
                <li className="flex items-center justify-between py-5">
                  <span className="font-medium text-deep">Adulte</span>
                  <span className="font-display text-2xl font-bold text-turquoise">
                    {formatPrix(PRICES.adulte)}
                  </span>
                </li>
                <li className="flex items-center justify-between py-5">
                  <span className="font-medium text-deep">Enfant 10–15 ans</span>
                  <span className="font-display text-2xl font-bold text-turquoise">
                    {PRICES.enfant10_15} DT
                  </span>
                </li>
                <li className="flex items-center justify-between py-5">
                  <span className="font-medium text-deep">Enfant − de 10 ans</span>
                  <span className="rounded-full bg-gold/15 px-4 py-1.5 font-display text-lg font-bold text-gold">
                    GRATUIT
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Plats supplémentaires */}
          <Reveal delay={120}>
            <div className="card h-full">
              <h3 className="font-display text-2xl font-bold text-deep">
                Plats supplémentaires
              </h3>
              <p className="mt-1 text-sm text-deep/60">Sur commande</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {PLATS_SUPP.map((plat) => (
                  <li
                    key={plat}
                    className="flex items-center gap-3 rounded-xl bg-sand/40 px-4 py-3 text-deep/85"
                  >
                    <span className="text-lg">🍤</span>
                    {plat}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
