import Reveal from './Reveal'
import {
  WHATSAPP_NUMBER,
  PHONE_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LOCATION_LABEL,
  MAPS_EMBED_URL,
} from '../config'

export default function Contact() {
  const coordonnees = [
    {
      icon: '📞',
      titre: 'Téléphone',
      valeur: PHONE_DISPLAY,
      href: `tel:${PHONE_DISPLAY.replace(/\s/g, '')}`,
    },
    {
      icon: '🟢',
      titre: 'WhatsApp',
      valeur: 'Écrivez-nous directement',
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
    },
    {
      icon: '📷',
      titre: 'Instagram',
      valeur: `@${INSTAGRAM_HANDLE}`,
      href: INSTAGRAM_URL,
    },
    {
      icon: '📍',
      titre: 'Lieu de rendez-vous',
      valeur: LOCATION_LABEL,
      href: 'https://www.google.com/maps/search/?api=1&query=El+Haouaria',
    },
  ]

  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">On vous attend</p>
          <h2 className="section-title">Contactez-nous</h2>
          <p className="mt-3 text-lg text-deep/70">
            Une question, une date, un groupe ? Écrivez-nous, on vous répond vite.
          </p>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
          {/* Coordonnées */}
          <Reveal className="grid gap-4 sm:grid-cols-2">
            {coordonnees.map((c) => (
              <a
                key={c.titre}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="card card-hover flex flex-col gap-2"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise/10 text-2xl">
                  {c.icon}
                </span>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-deep/50">
                  {c.titre}
                </p>
                <p className="font-medium text-deep">{c.valeur}</p>
              </a>
            ))}
          </Reveal>

          {/* Carte */}
          <Reveal delay={150}>
            <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-deep/5 shadow-md">
              <iframe
                title="Carte El Haouaria"
                src={MAPS_EMBED_URL}
                className="h-full min-h-[320px] w-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        {/* Appel à l'action final */}
        <Reveal delay={100} className="mt-10 text-center">
          <button
            onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-deep shadow-lg shadow-gold/20 transition-all hover:-translate-y-0.5 hover:bg-gold/90"
          >
            Réserver ma place →
          </button>
        </Reveal>
      </div>
    </section>
  )
}
