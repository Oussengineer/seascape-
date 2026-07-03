import Reveal from './Reveal'

const photos = [
  {
    src: '/media/repas.jpeg',
    titre: 'Le repas de la crique',
    desc: 'Une table généreuse, faite maison, face à la mer',
  },
  {
    src: '/media/scuba.jpeg',
    titre: 'Plongée sous-marine (Scuba Diving)',
    desc: 'Explorez les fonds marins du Cap Bon — selon disponibilité',
  },
  {
    src: '/media/charcuterie.jpeg',
    titre: 'La charcuterie',
    desc: 'Produits frais et locaux pour bien démarrer',
  },
]

export default function Galerie() {
  return (
    <section id="galerie" className="bg-deep py-20 text-white sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">En images</p>
          <h2 className="section-title text-white">Plongez dans l&rsquo;ambiance</h2>
          <p className="mt-3 text-lg text-turquoise-light/90">
            La crique, la mer et la table de Seascape Expeditions.
          </p>
        </Reveal>

        {/* Photos */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 120}>
              <figure className="group relative overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={p.src}
                  alt={p.titre}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent p-5">
                  <span className="block font-display text-lg font-bold">{p.titre}</span>
                  <span className="block text-sm text-turquoise-light/90">{p.desc}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
