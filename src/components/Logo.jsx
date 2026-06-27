/**
 * Logo officiel Seascape Expeditions (image fournie par le client).
 * Le logo intègre déjà le nom de la marque — pas besoin de texte additionnel.
 * Le badge blanc assure le contraste sur les fonds sombres (hero, footer, navbar transparente).
 */
export default function Logo({ className = 'h-12 w-12' }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl bg-white p-1 shadow-md ring-1 ring-deep/5 ${className}`}
    >
      <img
        src="/logo.jpg"
        alt="Seascape Expeditions"
        className="h-full w-full rounded-xl object-contain"
      />
    </span>
  )
}
