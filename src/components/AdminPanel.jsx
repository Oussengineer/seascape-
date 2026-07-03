import { useState, useEffect } from 'react'
import { API_URL } from '../config'

const ADMIN_EMAIL = 'expeditionsseascape@gmail.com'
const ADMIN_PASSWORD = 'Chahineseascape2026'

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [coupons, setCoupons] = useState([])
  const [bookings, setBookings] = useState([])
  const [newCode, setNewCode] = useState('')
  const [newType, setNewType] = useState('percentage')
  const [newValue, setNewValue] = useState('')
  const [selectedCoupon, setSelectedCoupon] = useState(null)

  const loadData = async () => {
    try {
      const [cRes, bRes] = await Promise.all([
        fetch(`${API_URL}/api/coupons`),
        fetch(`${API_URL}/api/bookings`)
      ])
      setCoupons(await cRes.json())
      setBookings(await bRes.json())
    } catch {}
  }

  useEffect(() => {
    if (loggedIn) loadData()
  }, [loggedIn])

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setError('')
    } else {
      setError('Email ou mot de passe incorrect')
    }
  }

  const addCoupon = async (e) => {
    e.preventDefault()
    if (!newCode.trim() || !newValue) return
    const res = await fetch(`${API_URL}/api/coupons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: newCode.toUpperCase(), type: newType, value: Number(newValue) })
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Erreur')
      return
    }
    setCoupons(await res.json())
    setNewCode('')
    setNewValue('')
    setError('')
  }

  const removeCoupon = async (code) => {
    const res = await fetch(`${API_URL}/api/coupons/${code}`, { method: 'DELETE' })
    setCoupons(await res.json())
    setBookings(bookings.filter(b => b.couponCode !== code))
    if (selectedCoupon === code) setSelectedCoupon(null)
  }

  const toggleActive = async (code) => {
    const res = await fetch(`${API_URL}/api/coupons/${code}/toggle`, { method: 'PUT' })
    setCoupons(await res.json())
  }

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })
    } catch { return iso }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-deep">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm mx-4">
          <h1 className="font-display text-2xl font-bold text-deep mb-6 text-center">Administration</h1>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <div className="space-y-4">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl border border-deep/15 px-4 py-3 outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/30" />
            <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl border border-deep/15 px-4 py-3 outline-none focus:border-turquoise focus:ring-2 focus:ring-turquoise/30" />
            <button type="submit" className="w-full rounded-full bg-turquoise py-3 text-white font-semibold hover:bg-turquoise/90 transition">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand/40">
      <div className="container-x py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-deep">Administration · Coupons</h1>
          <a href="/" className="text-sm text-turquoise hover:underline">← Retour au site</a>
        </div>

        <form onSubmit={addCoupon} className="card mb-8 p-6">
          <h2 className="font-display text-xl font-bold text-deep mb-4">Ajouter un coupon</h2>
          <div className="grid gap-4 sm:grid-cols-4">
            <input type="text" placeholder="Code (ex: PROMO10)" value={newCode} onChange={e => setNewCode(e.target.value)}
              className="rounded-xl border border-deep/15 px-4 py-3 outline-none focus:border-turquoise" />
            <select value={newType} onChange={e => setNewType(e.target.value)}
              className="rounded-xl border border-deep/15 px-4 py-3 outline-none focus:border-turquoise">
              <option value="percentage">% Réduction</option>
              <option value="fixed">Montant fixe (DT)</option>
            </select>
            <input type="number" placeholder="Valeur" value={newValue} onChange={e => setNewValue(e.target.value)}
              className="rounded-xl border border-deep/15 px-4 py-3 outline-none focus:border-turquoise" />
            <button type="submit" className="rounded-full bg-turquoise py-3 text-white font-semibold hover:bg-turquoise/90 transition">
              Ajouter
            </button>
          </div>
        </form>

        <div className="card p-6">
          <h2 className="font-display text-xl font-bold text-deep mb-4">Coupons existants</h2>
          {coupons.length === 0 ? (
            <p className="text-deep/50">Aucun coupon pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {coupons.map(c => (
                <div key={c.code}>
                  <button
                    onClick={() => setSelectedCoupon(selectedCoupon === c.code ? null : c.code)}
                    className={`w-full flex items-center justify-between border rounded-xl p-4 text-left transition hover:bg-deep/5 ${
                      selectedCoupon === c.code ? 'border-turquoise bg-turquoise/5' : 'border-deep/10'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-deep">{c.code}</span>
                      <span className="text-sm text-deep/60">
                        {c.type === 'percentage' ? `${c.value}% de réduction` : `${c.value} DT de réduction`}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${c.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {c.active ? 'Actif' : 'Inactif'}
                      </span>
                      <span className="text-xs text-deep/40">
                        ({bookings.filter(b => b.couponCode === c.code).length} réservation(s))
                      </span>
                    </div>
                    <div className="flex gap-2" onClick={e => e.stopPropagation()}>
                      <button onClick={() => toggleActive(c.code)}
                        className="px-3 py-1.5 rounded-lg border border-deep/15 text-sm hover:bg-deep/5 transition">
                        {c.active ? 'Désactiver' : 'Activer'}
                      </button>
                      <button onClick={() => removeCoupon(c.code)}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition">
                        Supprimer
                      </button>
                    </div>
                  </button>

                  {selectedCoupon === c.code && (
                    <div className="mt-2 ml-4 border-l-2 border-turquoise pl-4 space-y-2">
                      {bookings.filter(b => b.couponCode === c.code).length === 0 ? (
                        <p className="text-sm text-deep/50 py-2">Aucune réservation avec ce code.</p>
                      ) : (
                        bookings.filter(b => b.couponCode === c.code).map((b, i) => (
                          <div key={i} className="bg-white border border-deep/10 rounded-xl p-4 text-sm">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-deep/80">
                              <span><strong>Nom :</strong> {b.nom}</span>
                              <span><strong>Tél :</strong> {b.telephone}</span>
                              <span><strong>Date :</strong> {b.date}</span>
                              <span><strong>Réservé le :</strong> {formatDate(b.timestamp)}</span>
                              <span><strong>Adultes :</strong> {b.adultes}</span>
                              <span><strong>Enfants 10-15 :</strong> {b.enfants1015}</span>
                              <span><strong>Enfants -10 :</strong> {b.enfantsMoins10}</span>
                              <span><strong>Bateau :</strong> {b.baladeBateau ? 'Oui' : 'Non'}</span>
                              <span><strong>Scuba :</strong> {b.scubaDiving ? 'Oui' : 'Non'}</span>
                              {b.platsSupp?.length > 0 && (
                                <span className="col-span-2"><strong>Plats :</strong> {b.platsSupp.join(', ')}</span>
                              )}
                              {b.message && (
                                <span className="col-span-2"><strong>Message :</strong> {b.message}</span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
