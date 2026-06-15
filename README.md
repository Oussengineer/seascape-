# 🌊 Seascape Expeditions

Site de réservation pour **Seascape Expeditions** — une journée d'évasion en mer à **El Haouaria, Cap Bon (Tunisie)**.

Journée complète · 09h00 → 19h00 · baignade, snorkeling, kayak, paddle et déjeuner tunisien fait maison. Réservation **sans backend**, directement via **WhatsApp**.

## 🧱 Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Réservation via WhatsApp (`wa.me`) — aucune base de données

## 🚀 Démarrage

```bash
npm install      # installer les dépendances
npm run dev      # serveur de développement → http://localhost:5173
npm run build    # build de production (dossier dist/)
npm run preview  # prévisualiser le build
```

## ⚙️ Configuration

Toutes les valeurs à personnaliser sont centralisées dans [`src/config.js`](src/config.js) :

| Variable          | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `WHATSAPP_NUMBER` | Numéro WhatsApp au format international (ex `21612345678`) |
| `PHONE_DISPLAY`   | Numéro de téléphone affiché                              |
| `INSTAGRAM_*`     | Compte Instagram                                         |
| `PRICES.adulte`   | ⚠️ Prix adulte en DT (à compléter)                       |
| `PLATS_SUPP`      | Liste des plats supplémentaires                          |

## 🗂️ Structure

```
src/
├── components/
│   ├── Navbar.jsx        # navigation fixe + menu mobile
│   ├── Hero.jsx          # accueil
│   ├── Apropos.jsx       # à propos + chiffres-clés
│   ├── AccueilRepas.jsx  # programme de la journée (timeline + menu)
│   ├── Activites.jsx     # activités incluses
│   ├── Tarifs.jsx        # tarifs + plats supplémentaires
│   ├── Garanties.jsx     # garanties
│   ├── Contact.jsx       # coordonnées + carte
│   ├── Formulaire.jsx    # réservation → WhatsApp
│   ├── Footer.jsx
│   └── Reveal.jsx        # animation fade-in au scroll
├── hooks/useScrollReveal.js
├── config.js
├── App.jsx · App.css · main.jsx
```

---

© 2025 Seascape Expeditions · El Haouaria, Cap Bon, Tunisie
