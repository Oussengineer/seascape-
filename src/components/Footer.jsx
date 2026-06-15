import { WHATSAPP_NUMBER, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../config'

export default function Footer() {
  return (
    <footer className="bg-deep text-white">
      <div className="container-x py-14">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <p className="font-display text-2xl font-bold">
              Seascape <span className="text-turquoise-light">Expeditions</span>
            </p>
            <p className="mt-2 text-sm text-turquoise-light/80">
              El Haouaria · Cap Bon · Tunisie
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium transition hover:border-turquoise hover:bg-white/5"
            >
              <span className="text-lg">📷</span> @{INSTAGRAM_HANDLE}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5b]"
            >
              <span className="text-lg">🟢</span> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-turquoise-light/70">
          © 2025 Seascape Expeditions
        </div>
      </div>
    </footer>
  )
}
