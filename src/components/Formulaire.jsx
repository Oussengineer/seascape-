import { useMemo, useState } from 'react'
import Reveal from './Reveal'
import { WHATSAPP_NUMBER, PRICES, PLATS_SUPP } from '../config'

const aujourdhui = new Date().toISOString().split('T')[0]

const COUPONS_KEY = 'seascape_coupons'

function getCoupons() {
  try { return JSON.parse(localStorage.getItem(COUPONS_KEY)) || [] }
  catch { return [] }
}

const etatInitial = {
  nom: '',
  telephone: '',
  date: '',
  adultes: 1,
  enfants1015: 0,
  enfantsMoins10: 0,
  baladeBateau: false,
  scubaDiving: false,
  platsSupp: [],
  message: '',
}

function Champ({ label, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-deep">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-deep/15 bg-white px-4 py-3 text-deep outline-none transition focus:border-turquoise focus:ring-2 focus:ring-turquoise/30'

export default function Formulaire() {
  const [form, setForm] = useState(etatInitial)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const update = (champ) => (e) => {
    const { type, value, checked } = e.target
    setForm((f) => ({ ...f, [champ]: type === 'checkbox' ? checked : value }))
  }

  const togglePlat = (plat) => {
    setForm((f) => ({
      ...f,
      platsSupp: f.platsSupp.includes(plat)
        ? f.platsSupp.filter((p) => p !== plat)
        : [...f.platsSupp, plat],
    }))
  }

  const applyCoupon = () => {
    const coupons = getCoupons()
    const found = coupons.find(c => c.code === couponCode.toUpperCase() && c.active)
    if (found) {
      setAppliedCoupon(found)
      setCouponError('')
    } else {
      setAppliedCoupon(null)
      setCouponError('Code invalide ou inactif')
    }
  }

  const total = useMemo(() => {
    const a = Number(form.adultes) * PRICES.adulte
    const e = Number(form.enfants1015) * PRICES.enfant10_15
    const b = form.baladeBateau ? PRICES.baladeBateau : 0
    let t = a + e + b
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        t -= t * (appliedCoupon.value / 100)
      } else {
        t -= appliedCoupon.value
      }
      if (t < 0) t = 0
    }
    return Math.round(t * 100) / 100
  }, [form.adultes, form.enfants1015, form.baladeBateau, form.scubaDiving, appliedCoupon])

  const reductionText = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? `-${appliedCoupon.value}%`
      : `-${appliedCoupon.value} DT`
    : ''

  const dateFr = form.date
    ? new Date(form.date + 'T00:00:00').toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  const construireMessage = () => {
    const plats = form.platsSupp.length ? form.platsSupp.join(', ') : 'Aucun'
    const msg = form.message.trim() || 'Aucun'
    return (
      `Bonjour Seascape Expeditions 🌊\n\n` +
      `Nouvelle demande de réservation :\n` +
      `👤 Nom : ${form.nom}\n` +
      `📞 Téléphone : ${form.telephone}\n` +
      `📅 Date : ${dateFr || form.date}\n` +
      `👥 Adultes : ${form.adultes}\n` +
      `👦 Enfants 10–15 ans : ${form.enfants1015}\n` +
      `👶 Enfants −10 ans : ${form.enfantsMoins10}\n` +
      `🚤 Option bateau annexe : ${form.baladeBateau ? 'Oui' : 'Non'}\n` +
      `🤿 Plongée sous-marine (Scuba Diving) : ${form.scubaDiving ? 'Oui (à discuter)' : 'Non'}\n` +
      `🍽️ Plats supplémentaires : ${plats}\n` +
      (appliedCoupon ? `🎟️ Code promo : ${appliedCoupon.code} (${reductionText})\n` : '') +
      `💬 Message : ${msg}\n\n` +
      `Merci !`
    )
  }

  const envoyer = (e) => {
    e.preventDefault()
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(construireMessage())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="reservation" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Embarquez avec nous</p>
          <h2 className="section-title">Réserver ma place</h2>
          <p className="mt-3 text-deep/70">Places limitées · Réservation obligatoire</p>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-3xl">
          <form onSubmit={envoyer} className="card space-y-6 border-turquoise/15 p-6 sm:p-9">
            {/* Identité */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Champ label="Prénom et Nom" htmlFor="nom">
                <input id="nom" type="text" required value={form.nom} onChange={update('nom')}
                  placeholder="Ex : Amira Ben Salah" className={inputClass} />
              </Champ>
              <Champ label="Numéro de téléphone" htmlFor="telephone">
                <input id="telephone" type="tel" required value={form.telephone} onChange={update('telephone')}
                  placeholder="Ex : +216 ..." className={inputClass} />
              </Champ>
            </div>

            {/* Date */}
            <Champ label="Date souhaitée" htmlFor="date">
              <input id="date" type="date" required min={aujourdhui} value={form.date}
                onChange={update('date')} className={inputClass} />
            </Champ>

            {/* Participants */}
            <div className="grid gap-5 sm:grid-cols-3">
              <Champ label="Nombre d'adultes" htmlFor="adultes">
                <select id="adultes" value={form.adultes} onChange={update('adultes')} className={inputClass}>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </Champ>
              <Champ label="Enfants 10–15 ans" htmlFor="enfants1015">
                <select id="enfants1015" value={form.enfants1015} onChange={update('enfants1015')} className={inputClass}>
                  {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </Champ>
              <Champ label="Enfants − de 10 ans" htmlFor="enfantsMoins10">
                <select id="enfantsMoins10" value={form.enfantsMoins10} onChange={update('enfantsMoins10')} className={inputClass}>
                  {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </Champ>
            </div>

            {/* Options supplémentaires */}
            <div className="space-y-3">
              <p className="text-sm font-semibold text-deep">Options supplémentaires</p>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gold/30 bg-sand/30 p-4 transition hover:bg-sand/50">
                <input type="checkbox" checked={form.baladeBateau} onChange={update('baladeBateau')}
                  className="mt-1 h-5 w-5 flex-shrink-0 accent-gold" />
                <span className="text-deep/85">
                  <span className="font-semibold text-deep">🚤 Balade en bateau annexe</span>
                  <span className="block text-sm text-deep/60">
                    Groupe de 5 max · 30 min · {PRICES.baladeBateau} DT / groupe
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-turquoise/30 bg-turquoise/5 p-4 transition hover:bg-turquoise/10">
                <input type="checkbox" checked={form.scubaDiving} onChange={update('scubaDiving')}
                  className="mt-1 h-5 w-5 flex-shrink-0 accent-turquoise" />
                <span className="text-deep/85">
                  <span className="font-semibold text-deep">🤿 Plongée sous-marine (Scuba Diving)</span>
                  <span className="block text-sm text-deep/60">
                    Selon disponibilité — à discuter sur WhatsApp
                  </span>
                </span>
              </label>
            </div>

            {/* Plats supplémentaires */}
            <Champ label="Plats supplémentaires souhaités ?">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {PLATS_SUPP.map((plat) => (
                  <label key={plat}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-deep/10 px-4 py-2.5 text-sm text-deep/85 transition hover:border-turquoise/40 hover:bg-turquoise/5">
                    <input type="checkbox" checked={form.platsSupp.includes(plat)} onChange={() => togglePlat(plat)}
                      className="h-4 w-4 flex-shrink-0 accent-turquoise" />
                    {plat}
                  </label>
                ))}
              </div>
            </Champ>

            {/* Coupon */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-deep">Code promo</label>
              <div className="flex gap-3">
                <input type="text" placeholder="Ex : PROMO10" value={couponCode}
                  onChange={e => { setCouponCode(e.target.value); setAppliedCoupon(null); setCouponError('') }}
                  className={inputClass + ' flex-1'} />
                <button type="button" onClick={applyCoupon}
                  className="rounded-full bg-turquoise px-6 py-3 text-sm font-semibold text-white transition hover:bg-turquoise/90">
                  Appliquer
                </button>
              </div>
              {appliedCoupon && (
                <p className="mt-1.5 text-sm text-green-600">
                  ✓ Code appliqué : {reductionText}
                </p>
              )}
              {couponError && (
                <p className="mt-1.5 text-sm text-red-500">{couponError}</p>
              )}
            </div>

            {/* Message */}
            <Champ label="Message / demande spéciale" htmlFor="message">
              <textarea id="message" rows={3} value={form.message} onChange={update('message')}
                placeholder="Ex : menu végétarien pour 2 personnes, allergies, etc."
                className={inputClass + ' resize-none'} />
            </Champ>

            {/* Résumé automatique */}
            <div className="rounded-2xl border border-turquoise/20 bg-gradient-to-br from-turquoise/5 to-sand/30 p-5">
              <p className="mb-3 font-display text-lg font-bold text-deep">Récapitulatif</p>
              <ul className="space-y-1.5 text-sm text-deep/80">
                <li className="flex justify-between">
                  <span>{form.adultes} adulte(s)</span>
                  <span>{Number(form.adultes) * PRICES.adulte} DT</span>
                </li>
                <li className="flex justify-between">
                  <span>{form.enfants1015} enfant(s) 10–15 ans</span>
                  <span>{Number(form.enfants1015) * PRICES.enfant10_15} DT</span>
                </li>
                <li className="flex justify-between text-deep/60">
                  <span>{form.enfantsMoins10} enfant(s) −10 ans</span>
                  <span>Gratuit</span>
                </li>
                {form.baladeBateau && (
                  <li className="flex justify-between">
                    <span>Balade en bateau annexe</span>
                    <span>{PRICES.baladeBateau} DT</span>
                  </li>
                )}
                {form.scubaDiving && (
                  <li className="flex justify-between">
                    <span>Plongée sous-marine (Scuba Diving)</span>
                    <span className="text-deep/60">à discuter</span>
                  </li>
                )}
                {form.platsSupp.length > 0 && (
                  <li className="flex justify-between text-deep/60">
                    <span>Plats supplémentaires ({form.platsSupp.length})</span>
                    <span>sur commande</span>
                  </li>
                )}
                {appliedCoupon && (
                  <li className="flex justify-between text-green-600 font-semibold">
                    <span>Réduction ({appliedCoupon.code})</span>
                    <span>-{appliedCoupon.type === 'percentage'
                      ? Math.round(total / (1 - appliedCoupon.value / 100) * appliedCoupon.value / 100) + ' DT'
                      : appliedCoupon.value + ' DT'}</span>
                  </li>
                )}
              </ul>
              <div className="mt-3 flex items-center justify-between border-t border-deep/10 pt-3">
                <span className="font-display text-lg font-bold text-deep">Total estimé</span>
                <span className="font-display text-2xl font-bold text-turquoise">{total} DT</span>
              </div>
              <p className="mt-2 text-xs text-deep/50">
                Estimation indicative — hors plats supplémentaires (facturés sur commande).
              </p>
            </div>

            {/* Envoi */}
            <button type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5b] hover:shadow-xl">
              Envoyer via WhatsApp 🟢
            </button>
            <p className="text-center text-xs text-deep/50">
              Votre demande s'ouvrira dans WhatsApp — aucune donnée n'est stockée.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
