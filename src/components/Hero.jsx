function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <header
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-deep text-white"
    >
      {/* Dégradé bleu profond → turquoise */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep via-deep to-turquoise/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(144,224,239,0.35),transparent_55%)]" />

      {/* Vagues décoratives en bas */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,64 L1440,120 L0,120 Z"
        />
      </svg>

      <div className="container-x relative z-10 py-24 text-center">
        <div className="animate-[fade-up_0.9s_ease-out_both]">
          <p className="eyebrow text-gold">El Haouaria · Cap Bon</p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl">
            Seascape <span className="text-turquoise-light">Expeditions</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-display text-2xl text-turquoise-light sm:text-3xl">
            Journée Évasion en Mer
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-white/85 sm:flex-row sm:gap-6 sm:text-base">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            🕘 Journée complète · 09h00 → 19h00
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            📍 El Haouaria, Cap Bon
          </span>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => scrollToId('reservation')}
            className="w-full rounded-full bg-gold px-8 py-4 text-base font-semibold text-deep shadow-lg shadow-gold/20 transition-all hover:-translate-y-0.5 hover:bg-gold/90 hover:shadow-xl sm:w-auto"
          >
            Réserver ma place
          </button>
          <button
            onClick={() => scrollToId('programme')}
            className="w-full rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
          >
            Voir le programme
          </button>
        </div>
      </div>
    </header>
  )
}
