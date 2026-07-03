import { useState, useEffect } from 'react'

const ADMIN_EMAIL = 'expeditionsseascape@gmail.com'
const ADMIN_PASSWORD = 'Chahineseascape2026'
const COUPONS_KEY = 'seascape_coupons'

function getCoupons() {
  try { return JSON.parse(localStorage.getItem(COUPONS_KEY)) || [] }
  catch { return [] }
}

function saveCoupons(list) {
  localStorage.setItem(COUPONS_KEY, JSON.stringify(list))
}

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [coupons, setCoupons] = useState([])
  const [newCode, setNewCode] = useState('')
  const [newType, setNewType] = useState('percentage')
  const [newValue, setNewValue] = useState('')

  useEffect(() => {
    if (loggedIn) setCoupons(getCoupons())
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

  const addCoupon = (e) => {
    e.preventDefault()
    if (!newCode.trim() || !newValue) return
    const list = getCoupons()
    if (list.find(c => c.code === newCode.toUpperCase())) {
      setError('Ce code existe déjà')
      return
    }
    list.push({ code: newCode.toUpperCase(), type: newType, value: Number(newValue), active: true })
    saveCoupons(list)
    setCoupons(list)
    setNewCode('')
    setNewValue('')
    setError('')
  }

  const removeCoupon = (code) => {
    const list = getCoupons().filter(c => c.code !== code)
    saveCoupons(list)
    setCoupons(list)
  }

  const toggleActive = (code) => {
    const list = getCoupons().map(c =>
      c.code === code ? { ...c, active: !c.active } : c
    )
    saveCoupons(list)
    setCoupons(list)
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
                <div key={c.code} className="flex items-center justify-between border border-deep/10 rounded-xl p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-deep">{c.code}</span>
                    <span className="text-sm text-deep/60">
                      {c.type === 'percentage' ? `${c.value}% de réduction` : `${c.value} DT de réduction`}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${c.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {c.active ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleActive(c.code)}
                      className="px-3 py-1.5 rounded-lg border border-deep/15 text-sm hover:bg-deep/5 transition">
                      {c.active ? 'Désactiver' : 'Activer'}
                    </button>
                    <button onClick={() => removeCoupon(c.code)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-sm hover:bg-red-100 transition">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
